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

judge=db.judge
judge2=db.judge2
lis=[
"Vikings",
"EBE Wild Boar",
"Guardians of the Daten",
"TAT",
"Genobot",
"AutoPilot-MLOps",
"TAG",
"Prognostics",
"Mobiligo",
"Genomics.ops.ai",
    ]
judge_lis=[
    "JIK7","C26B","B9N4","KN8P"
]
judge_lis_2=['YL5C',"J8M3","GGKA"]
dic=[]
records.delete_many({})
judge.delete_many({})
for j in judge_lis:
    judge.insert_one({"user_name": j, "password": j + "@hackathon"})

for j in judge_lis_2:
    judge2.insert_one({"user_name": j, "password": j + "@hackathon"})
for i in lis:

    for j in judge_lis:
        dic.append({"Team_Name":i,"Idea_and_Usability":0,"Innovation":0,"Implementation":0,"Team_Presentation":0,"Business_Value":0,"Judge_Name":j})
print(dic)

records.insert_many(dic)