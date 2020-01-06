import "core-js/modules/es.symbol.description";
import "core-js/modules/es.object.assign";
import { check } from './utilities.js';
import { getEventsList } from './eventsGateaway.js';
let now;
let end;
let selector;
let getHours;
let sectionElem;
let parent;
export const renderEvents = () => {
  let obj = [{
    id: 0
  }];

  if (!JSON.parse(localStorage.getItem('httpRequest'))) {
    listEvents = localStorage.setItem('httpRequest', JSON.stringify(obj));
  }

  let sectionElemForInterval = [];
  let sectionElemRend = [];
  getEventsList().then(tasksList => {
    localStorage.setItem('httpRequest', JSON.stringify(tasksList));
  });
  let listEvents = JSON.parse(localStorage.getItem('httpRequest'));
  let listEventsFor2Days = [];
  listEvents.map(elem => {
    let hourOfBegin = new Date(elem.startDateEvent).getHours();
    let hoursOfEnd = new Date(elem.endDateEvent).getHours();

    if (hourOfBegin > hoursOfEnd) {
      const startMonth = "0".concat(new Date(elem.startDateEvent).getMonth() + 1);
      const startDate = "0".concat(new Date(elem.startDateEvent).getDate());
      const endMonth = "0".concat(new Date(elem.endDateEvent).getMonth() + 1);
      const endDate = "0".concat(new Date(elem.endDateEvent).getDate());
      const todayEndEvent = "".concat(new Date(elem.startDateEvent).getFullYear(), "-").concat(startMonth.slice(-2), "-").concat(startDate.slice(-2));
      const tommorowBeginEvent = "".concat(new Date(elem.endDateEvent).getFullYear(), "-").concat(endMonth.slice(-2), "-").concat(endDate.slice(-2));
      const todayEvent = Object.assign({}, elem);
      const tommorowEvent = Object.assign({}, elem);
      Object.assign(todayEvent, {
        endDateEvent: "".concat(todayEndEvent, "T24:00"),
        transfer: 'main'
      });
      Object.assign(tommorowEvent, {
        startDateEvent: "".concat(tommorowBeginEvent, "T00:00"),
        transfer: 'additional'
      });
      listEventsFor2Days.push(todayEvent);
      listEventsFor2Days.push(tommorowEvent);
    } else {
      listEventsFor2Days.push(elem);
    }
  });
  listEventsFor2Days.map(elem => {
    now = new Date("".concat(elem.startDateEvent));
    end = new Date("".concat(elem.endDateEvent));
    selector = "".concat(now.getFullYear() + '-').concat(now.getMonth() + 1 + '-').concat(check(now.getDate()));
    getHours = now.getHours();

    if (getHours < 10) {
      getHours = "0".concat(now.getHours());
    }

    ;
    parent = document.querySelector("[id='".concat(getHours, "']"));
    if (parent === null) return;
    sectionElem = parent.querySelector("[id='".concat(selector, "']"));

    if (sectionElem === null) {
      return;
    }

    ;
    let bgnEvent = new Date(now);
    let endEvent = new Date(end);
    let diffEndBgn = (endEvent - bgnEvent) / 1000 / 60;
    let flexDirection = 'flex-direction:column';

    if (diffEndBgn < 60) {
      flexDirection = 'flex-direction:row; align-items:center; padding:0px';
    }

    ;
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let height = (end.getHours() - hours) * 60;
    minutes > 0 ? height = height - minutes : minutes;
    let startTime = "".concat(check(new Date(elem.startDateEvent).getHours()) + ':' + check(new Date(elem.startDateEvent).getMinutes()));
    let endTime = "".concat(check(new Date(elem.endDateEvent).getHours()) + ':' + check(new Date(elem.endDateEvent).getMinutes()));
    let divElem = "<div id='".concat(elem.id, "' class=\"event\" \n        data-id-number='").concat(elem.id, "'\n        data-time-ivent='").concat(hours, "'\n        data-id-parent='").concat(selector, "'\n        data-transfer-event='").concat(elem.transfer, "'\n        style=\"\n        height:").concat(diffEndBgn, "px; \n        top:").concat(now.getMinutes(), "px; ").concat(flexDirection, ";\n        background-color:").concat(elem.color, "\"\n        >\n        <div class=\"event__name\" data-id-number='").concat(elem.id, "'>\n        ").concat(elem.name, "\n        </div>\n        <div class=\"event__time\" data-id-number='").concat(elem.id, "'>\n        ").concat(startTime, " - ").concat(endTime, "\n        </div>\n        <div class=\"event__description\" data-id-number='").concat(elem.id, "'>\n        ").concat(elem.description, "\n        </div>\n        </div>");
    sectionElemForInterval.push(sectionElem);
    sectionElemRend.push(divElem);
  });
  let increaser = 0;

  const sectionElemRender = () => {
    if (!sectionElemRend[increaser]) {
      return;
    } else {
      sectionElemForInterval[increaser].innerHTML = sectionElemRend[increaser];
      increaser++;
    }
  };

  let interval = setInterval(sectionElemRender, 50);
  setTimeout(() => {
    clearInterval(interval);
  }, 12000);
};