'use strict'

const Client = require('node-rest-client').Client;
const _ = require('lodash');

var config = {
            hueBridgeHost: 'http://192.168.1.1/api/',
            port:80,
            method: 'GET',
            path:{
                username: '7GlVoqU8Oy2CaXTiTpdz83o5wkkkUpnd7qzWEPpf'
            },
            headers: {}
         }

class Hue{
    constructor(){
        this.client = new Client();
        this.order = config.hueBridgeHost + config.path.username + '/';
    }


//general
    order(){
        return this.order;
    }
    
    action(action){
        this.order += action + '/';
        return this;
    };
    
    params(paramlist){
        if(paramlist < 1){
            throw new Error('InvalidArgumentException : no params provided in params method in HUE connector.');
        }
        this.order += ('?' + paramlist.first().name + paramlist.first().value );
        for(let i=1; i < paramlist.length; i ++){
            this.order += _.join(['&', paramlist[i].name,'=', paramlist[i].value], '');
        } 
    }

     get(callback){
        this.client.get(this.order, function(data, response){
            if(data.error) throw new Error(data.error);
            callback(data);
        });
    }

    put(args, callback){
        this.client.put(this.order, args, function(data, response){
            if(data.error) throw new Error(data.error);
            callback(data);
        });
    }

    post(args, callback){
        this.client.post(this.order, args, function(data, response){
            if(data.error) throw new Error(data.error);
            callback(data);
        });
    }

//lights
    lights(){
        this.order += 'lights/';
        return this;
    }
    light(id){
        this.order += 'lights/' + id + '/';
        return this;
    }
//groups
    groups(){
        this.order += 'groups/';
        return this;
    }
    group(id){
        this.order += 'groups/' +id +'/';
        return this;
    }

}

module.exports = Hue;