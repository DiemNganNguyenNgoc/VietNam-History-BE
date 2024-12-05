const Tag = require('../models/TagModel');
const bcrypt = require("bcrypt");

const createTag = (newTag) => {
    return new Promise(async (resolve, reject) => {
        const { name, description} = newTag;
        try {
            const checkTag = await Tag.findOne({
                name: name
            })
            if (checkTag !== null) {
                resolve({
                    status: 'OK',
                    message: 'The tag name is already'
                })
            }
            const createdTag = await Tag.create({
                name, description});
            if (createdTag) {
                resolve({
                    status: 'OK',
                    message: 'Tag created successfully',
                    data: createdTag
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateTag = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTag = await Tag.findOne({ _id: id })
            if (checkTag === null) {
                resolve({
                    status: 'OK',
                    message: 'The Tag is not defined'
                })
            }

            const updatedTag = await Tag.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedTag
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteTag = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTag = await Tag.findOne({ _id: id })
            if (checkTag === null) {
                resolve({
                    status: 'OK',
                    message: 'The Tag is not defined'
                })
            }
            await Tag.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete sucessfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

// const getAllTag = (limit, page, sort, filter) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const totalTag = await Tag.countDocuments();

//             if(filter){
//                 const label=filter[0]
//                 const allTagFilter= await Tag.find({[label]:{'$regex':filter[1]}}).limit(limit).skip(page*limit)
//                 resolve({
//                     status: 'OK',
//                     message: 'Success',
//                     data: allTagFilter,
//                     total: totalTag,
//                     pageCurrent: Number(page+1),
//                     totalPage: Math.ceil(totalTag/limit)
//                 })
//             }

//             if(sort){
//                 const objectSort={}
//                 objectSort[sort[0]]=sort[1]
//                 const allTagSort= await Tag.find().limit(limit).skip(page*limit).sort(objectSort)
//                 resolve({
//                     status: 'OK',
//                     message: 'Success',
//                     data: allTagSort,
//                     total: totalTag,
//                     pageCurrent: Number(page+1),
//                     totalPage: Math.ceil(totalTag/limit)
//                 })
//             }

//             const allTag=await Tag.find().limit(limit).skip(page*limit)
//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//                 data: allTag,
//                 total: totalTag,
//                 pageCurrent: Number(page+1),
//                 totalPage: Math.ceil(totalTag/limit)
//             })
//         } catch (e) {
//             reject(e);
//         }
//     });
// };



// const getDetailTag = (id) => {
//     return new Promise(async (resolve, reject) => {

//         try {
//             const tag = await Tag.findOne({ _id: id })
//             if (tag === null) {
//                 resolve({
//                     status: 'OK',
//                     message: 'The Tag is not defined'
//                 })
//             }

//             resolve({
//                 status: 'OK',
//                 message: 'Get detail tag sucessfully',
//                 data: tag
//             });
//         } catch (e) {
//             reject(e);
//         }
//     });
// };



module.exports = { createTag, updateTag, deleteTag};
