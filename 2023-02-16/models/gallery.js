const fs = require('fs');

galleryDataPath = './databases/gallery.json'

function readGalleryData () {
    const fileBuffer = fs.readFileSync(galleryDataPath, 'utf8');
    const galleryData = JSON.parse(fileBuffer);
    return galleryData
}

function writeGalleryData (galleryDataToWrite) {
    const stringifyiedData = JSON.stringify(galleryDataToWrite);
    fs.writeFileSync(galleryDataPath, stringifyiedData, 'utf8');
}

function autoId () {
    const galleryData = readGalleryData();
    const galleryDataIds = galleryData.map(photo => Number(photo.id));
    const lastId = Math.max(...galleryDataIds);
    const nextId = galleryData.length == 0 ? 0 : lastId + 1
    return nextId
}

function checkUpload (fileObject) {
    return !fileObject ? false : true
}

function listPhotos () {
    const galleryData = readGalleryData();
    return galleryData;
}

function uploadPhoto (newName, newPath) {
    let galleryData = readGalleryData();
    newId = autoId();
    galleryData.push({id: newId, name: newName, path: newPath })
    writeGalleryData(galleryData);
}

function deletePhoto (photoIdToBeDeleted) {
    let galleryData = readGalleryData();
    const photoToBeDeleted = galleryData.find(photo => photo.id == photoIdToBeDeleted);
    const photoIndexToBeDeleted = galleryData.indexOf(photoToBeDeleted);
    galleryData.splice(photoIndexToBeDeleted, 1);
    fs.unlinkSync('./public/photos/' + photoToBeDeleted.path)
    writeGalleryData(galleryData);
}

module.exports = {
    listPhotos,
    uploadPhoto,
    deletePhoto,
    checkUpload
}