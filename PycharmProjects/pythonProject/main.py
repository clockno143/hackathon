import json
import uuid

import flask
import flask_cors
from flask import Flask,render_template

import pymongo
app = Flask(__name__)

client = pymongo.MongoClient("mongodb+srv://nikhilvb:vishnubb@cluster0.pxucn.mongodb.net/hackathon?retryWrites=true&w=majority")
db = client.get_database('hackathon')
records=db.teams
records2=db.teams2
judge=db.judge

query=[
    { "$group":
        {
            "_id": "$Team_Name",
            "Innovation": {
"$sum": "$Innovation"
},
"Implementation": {
"$sum": "$Implementation"
},

"Idea_and_Usability": {
"$sum": "$Idea_and_Usability"
},
"Team_Presentation": {
"$sum" :"$Team_Presentation"
},
"Business_Value": {
"$sum": "$Business_Value"
}

}

    },
{ "$set":
      {
         "Total": {"$sum": ["$Idea_and_Usability", "$Innovation", "$Implementation",
                         "$Team_Presentation", "$Business_Value"]},
          "Team_Name":"$_id"
}

},
{
 "$sort":

{
  "_id": 1
}


}]



def updat_to_mongo(data):
    name=data["Judge_Name"]
    data.pop("Judge_Name")
    for i in data:
            total=sum(data[i].values())

            records.update_one({"Team_Name":str(i),"Judge_Name":name},{"$set":data[i]})


def authenticate(data,judges):
     for judge in judges:
      if data["user_name"]== judge["user_name"]:
          if data["password"]== judge["password"]:
              return flask.json.jsonify(message=1)
          else:
              return flask.json.jsonify(message="Invalid Username Password")
     return flask.json.jsonify(message="Invalid Username ")

@app.route("/")
def hello_world():
    return  "hello"


@app.route("/change",methods=["get","POST","put"])
def p():

   data=flask.request.json
   updat_to_mongo(data)
   response=flask.json.jsonify(message="Simple server is running")
   response.headers.add("Access-Control-Allow-Origin", "*")
   return response

@app.route("/teams",methods=["get","post"])
def temp():

    d1 = list(records.aggregate(query))
    response= flask.jsonify(d1)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/judge_s",methods=["get","post"])
def judge_score():
    data = flask.request.json
    name=data["Judge_Name"]

    d1=records.aggregate(
        [{"$match":
            {
                "Judge_Name": name}},
            {
                "$project":
                    {"_id":0,"Judge_Name":0}
            },
            {
                "$sort":{"Team_Name":1}
            }])
    response = flask.jsonify(list(d1))
    return response


@app.route("/judge",methods=["get","post"])
def judges():
    data=flask.request.json
    d1 = list(judge.find({}, {"_id": 0}))
    response=authenticate(data,d1)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
@app.route("/round2_teams",methods=["get","post"])
def round2():
    data = flask.request.json
    records2.delete_many({})
    records2.insert_many(data)
    response = flask.json.jsonify(message="Simple server is running")
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

flask_cors.CORS(app)
app.run(host="localhost", port=5001, debug=True)
