const {MongoClient, ServerApiVersion} = require ("mongodb")
const Notion = require('../notion-communicate/index')
const uri = 'mongodb+srv://cluster0.hlcwf.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority'
const credentials = 'X509-cert-7653934695476317602.pem'

async function update_mainNotion(dbname, collecname, notionID, current_date_string)
{
    var seleted_dbnaming = {DB:dbname, collection:collecname}
    
    const client = new MongoClient(uri, {
        sslKey: credentials,
        sslCert: credentials,
        serverApi: ServerApiVersion.v1
      });
    
    try
    {
        await client.connect()
        const database = client.db(seleted_dbnaming.DB)
        const collec = database.collection(seleted_dbnaming.collection)
        
        //get date data.
        var calender = await Notion.getItemNOTION_passorfail(notionID, current_date_string)
        async function applyeachid(predoc) 
        {
            var current_id = predoc["id"]
            for (date in predoc)
            {
                if (date === "id") {continue}
                if  (predoc[date] == false) {await collec.deleteOne({"todo":current_id, "date":date}); continue}
                await collec.replaceOne({"todo":current_id, "date":date},{"todo":current_id, "date":date},{upsert:true})
            }

        }
        for (key in calender)
        {
            predoc = calender[key]
            await applyeachid(predoc)
        }
        //debug
    }
    finally
    {
        await client.close();
    }
}



async function undo_mainNotion(dbname, collecname, notionID, current_date_string)
{
    var seleted_dbnaming = {DB:dbname, collection:collecname}
    
    const client = new MongoClient(uri, {
        sslKey: credentials,
        sslCert: credentials,
        serverApi: ServerApiVersion.v1
      });
    
    try
    {
        await client.connect()
        const database = client.db(seleted_dbnaming.DB)
        const collec = database.collection(seleted_dbnaming.collection)
        
        //get date data.
        var calender = await Notion.getItemNOTION_passorfail(notionID, current_date_string)
        async function applyeachid(predoc) 
        {
            var current_id = predoc["id"]
            for (date in predoc)
            {
                if (date === current_id) {continue}
                await collec.deleteOne({"todo":current_id, "date":date})
            }

        }
        for (key in calender)
        {
            predoc = calender[key]
            await applyeachid(predoc)
        }
        //debug
    }
    finally
    {
        await client.close();
    }
}



exports.update_mainNotion = update_mainNotion
exports.undo_mainNotion = undo_mainNotion