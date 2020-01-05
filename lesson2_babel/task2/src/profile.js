const printProfile = profileData => {
    const { name, company } = profileData;
    console.log(`${name} from ${company}`);

};

export { printProfile }