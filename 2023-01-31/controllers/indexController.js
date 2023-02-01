const controller = {
    index: (req, res) => 
    res.send(
        `
        <form action="/response" method="POST">
            <fieldset>
                <legend>Qual é a melhor dupla de professores de programação?</legend>

                <input type="radio" name="resposta" value="jeferson-thiago" checked>
                <label>Jeferson e Thiago</label>
                <br>

                <input type="radio" name="resposta" value="patati-patata">
                <label>Patati e Patatá</label>
                <br>

                <input type="radio" name="resposta" value="rosa-rosinha">
                <label>Rosa e Rosinha</label>
                <br>

                <button type="submit">Responder</button>
            </fieldset>
        </form>
        `
    ),
};

module.exports = controller;