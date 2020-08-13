const regex = {
    title: (str) => {        
        const rgx = /[\']/i;
        const replace = '"';
        return str.replace(rgx, replace);
    }
}