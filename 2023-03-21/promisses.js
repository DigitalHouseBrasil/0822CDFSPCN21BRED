const conditions = [
    {id: 0, cond1: true, cond2: false},
    {id: 1, cond1: true, cond2: true},
    {id: 3, cond1: false, cond2: false}
];

function checkFirstCondition (data) {
    return new Promise (
        (result, reject) => {
            let conditionChecked = conditions.filter(entry => entry.cond1 === true);
            if (conditionChecked.length > 0) {
                result (conditionChecked)
            } else {
                reject ('Não há entradas que satisfazem a condição 1')
            }
        }
    );
};

function checkSecondCondition (data) {
    return new Promise (
        (result, reject) => {
            let conditionChecked = conditions.filter(entry => entry.cond2 === true);
            if (conditionChecked.length > 0) {
                result (conditionChecked)
            } else {
                reject ('Não há entradas que satisfazem a condição 2')
            }
        }
    );
};

checkFirstCondition(conditions)
    .then(firstConditionChecked => checkSecondCondition(firstConditionChecked))
    .then(result => console.log(result))
    .catch(error => console.log(error));