const multer = require('multer')
const {randomUUID} = require('crypto')

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, './uploads')
    },

    filename:(req,file,cb)=>{
        
        const UUID = randomUUID()

        const appendName = UUID + "_" + file.originalname.replaceAll(" ", "_");
 
        cb(null,appendName)
    }
})

const upload = multer({ storage })

module.exports = upload