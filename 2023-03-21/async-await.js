const conditions = [
    {id: 0, cond1: true, cond2: false},
    {id: 1, cond1: true, cond2: false},
    {id: 3, cond1: false, cond2: false}
];

function checkFirstCondition (data) {
    return new Promise (
        (result, reject) => {
            setTimeout(() => {
                let conditionChecked = conditions.filter(entry => entry.cond1 === true);
                if (conditionChecked.length > 0) {
                    result (conditionChecked)
                } else {
                    reject ('Não há entradas que satisfazem a condição 1')
                }
            }, 1000);
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

// Notação com função tradicional: 
// async function [nome da funcao] (argumentos) {corpo da funcao}
// Notação com arrow function:
// [const ou var ou let] [nome da funcao] = async (argumentos) => {corpo da funcaoj}

async function checkAllConditions (data) {
    try {
        let firstConditionChecked = await checkFirstCondition(data);
        let allConditionsChecked = await checkSecondCondition(firstConditionChecked);
        console.log(allConditionsChecked);
    } catch (error) {
        console.log(error);
    }
};

checkAllConditions(conditions);