const { MongoDBNamespace } = require("mongodb")

mdg = require("./module/mongodb-communicate/mongod_dbmanage_generate")

const IDStore_passorfail = {"todoID" : "fd644186c73345438d5c4ce2c8cfb2ca",
"studyID" : "f873e204649942eb9122d7d64e44a41d",
"catID" : "9b797bb26dfe4f97b0a8c67647dc4c2e",
"projectsID" : "fc1785afaa5c4883af9819154381f0ea"}

const collecStore_passorFail = {"todoID" : "lifeCycle",
"studyID" : "studyManage",
"catID" : "catManage",
"projectsID" : "studyCheck"}

const IDstore_pageamount = {
  "rank_1" : "ac126e4ba78d4063b84fd23f6fe8bb5a"
}

//mdg.undo_mainNotion("lifeRhythms", "catManage", IDStore_passorfail.todoID)

function update()
{
    for (key in collecStore_passorFail)
    {
        collecname = collecStore_passorFail[key]
        idname = IDStore_passorfail[key]
        mdg.update_mainNotion("lifeRhythms", collecname, idname)
    }
}
function undo()
{
    for (key in collecStore_passorFail)
    {
        collecname = collecStore_passorFail[key]
        idname = IDStore_passorfail[key]
        mdg.undo_mainNotion("lifeRhythms", collecname, idname)
    }
}
update()