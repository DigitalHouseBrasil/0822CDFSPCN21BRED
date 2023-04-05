const Categories = require('../models/Categories');

async function createCategory (req, res) {
    const { name } = req.body;
    const createdCategory = await Categories.create({ name });

    return res.json(createdCategory);
};

async function listCategories (req, res) {
    const categories = await Categories.findAll({
        include: {
            association: 'members'
        }
    });

    return res.json(categories);
};

async function listCategory (req, res) {
    const idToList =  req.params.id;
    const foundCategory = await Categories.findByPk(idToList);

    return res.json(foundCategory);
};

async function updateCategory (req, res) {
    const idToUpdate =  req.params.id;
    const newName =  req.body.name
    await Categories.update(
        { name: newName },  
        { where: {id: idToUpdate} }
    );

    return res.json({'message': 'A categoria foi atualizada com sucesso.'})
};

async function deleteCategory (req, res) {
    const idToDelete =  req.params.id;
    Categories.destroy({ where: {id: idToDelete} });

    // retornar uma mensagem para o usuário
    return res.json({'message': 'A categoria foi deletada com sucesso.'})
};

module.exports = {
    createCategory,
    listCategory,
    listCategories,
    updateCategory,
    deleteCategory
};