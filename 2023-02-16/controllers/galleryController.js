const galleryModel = require('../models/gallery');

function showGallery (req, res) {
    const photos = galleryModel.listPhotos();
    res.render('gallery', {photos});
};

function uploadPhoto (req, res) {
    const isRegular = galleryModel.checkUpload(req.file);
    if (isRegular) {
        galleryModel.uploadPhoto(
            req.file.originalname,
            req.file.filename
        )
        res.redirect('/')
    } else {
        res.send('Você precisa carregar um arquivo')
    }
}

function deletePhoto (req, res) {
    const photoIdToBeDeleted = Number(req.params.id);
    galleryModel.deletePhoto(photoIdToBeDeleted);
    res.redirect('/')
}

module.exports = {
    showGallery,
    uploadPhoto,
    deletePhoto
}