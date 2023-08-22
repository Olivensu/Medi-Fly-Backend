const fs = require('fs').promises;

const deleteImage= async(imagePath)=>{
     try {
        await fs.access(imagePath)
        await fs.unlink(imagePath)
        console.log('User image was deleted successfully');
     } catch (error) {
        console.error('User Image does not exit')
     }
}

module.exports = {deleteImage}