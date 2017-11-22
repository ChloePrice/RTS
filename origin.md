This file describe the original idea

# JINX - Rise the sun

![test img](http://k31.kn3.net/taringa/5/7/8/B/7/9/EduardoKpoxD/1E7.jpg)


### Just pined
- I think getting some LED stuff would be great to create a better atmosphere. Hue should have some. Have a look, must not be expensive. (EDIT : YES IT IS)

  >To be honnest, all this smart-light-thing isn't really NEEDED to live. Indeed, you just need a place to sleep, something to eat and drink and you're good. But yet, all that stuff is hella cool, isn't it? You and people have a party at home? Tinkle! All the fucking light's of your house are turning into wonderful colors. AMBIANCE. Imagine all these lighted bands you can put anywhere (under the sofa!).

## Material available :
  - raspberry pi 1 type B (I'm so eager to switch on a PI 3 with a windows server)
  - arduino board (need to pick an alim though)
  
## Material required :
  - Smartlight bulb hue (~70€-100€)
  - http://www2.meethue.com/en-gb/products/
  
## Description:
So as to have a very cool and peaceful morning I need a very smart alarm :3. I need to program Jinx so as she :
  - knows when am going to bed (rounded to 5 minutes)
  - knows how long I'd like to sleep
  - wakes me up smoothly at the determined hour with quiet music (which sound louder and louder but not too much) and relaxing light fade in.
  - what about a weather option to show on demand what the weather like?!
  - obviously jinx need to be able to provide gaming | working | watching moovie | ...

## How does Jinx knows that I've just gone to bed :
>I need to find the perfect solution for this... So there is two good solutions that came to my mind. The first one isn't perfect enough and the second add some constraints. I think implementing all of them could be funny but one is good enough to start.

__Phone inactivity :__ since I'm not a sleepwalker, I don't use my phone while snoring so that if I haven't use it for an hour, I may be sleeping. Jinx has to detect this activity period so as to know I MAY be sleeping. If inactivity is extended to 4 hours then I MUST be sleeping and the process is enabled. If the phone is used more than 30 secondes, the process is silently cancelled (just waking up to check the time...). Setting this logic up according to what time it is must be quite an IA thing but should be ok to implement. The main problem is about the exact time I went to bed, because it can't be determined with the precision that the specifications require unless I check my phone a last time just before sleeping... Maybe I do, but it's not a truly sure point.

__NFC Tag :__ I'm used to sleep by putting my phone at the same place, near my bed... So if my phone is here, I must be sleeping. What if I'm drunk though? I maybe won't put my phone at the right place...

__Battery Loading :__ AS a third possibility, I use to load my phone battery while I'm sleeping. But this is a bad point because I know it can occur battery dammage. So this is a bad habbit I'd like to stop.

## How does she know when to wake me up :
  - For worked days, I've got a fixed agenda so as she just need to get me ready for work (fixed hour)
  - On the weekend, I like to rest and sleep more (8 to 9 hours) but I don't go to bed at fixed hour so Jinx must be able to guess that I'm sleeping
   
## Jinx should watch for sunset
According to my location (got from phone), Jinx sould be able to know when the sunset takes place (an API can get that for me). So that she (propose?) turns on the lights if I'm in the room.

## NFC tags
I think having several NFC tags in the room could be really useful... Think about it.
- Drop your phone on a tag and change the ambiance.

## Requirements
  - Jinx has to adapt to hour changes (countries, summer-time)
  - It'd be better if Jinx was on my server, not on my phone (battery concerns)
  - the phone will be part of it obviously to guess that am sleeping
  - IMO it's better to pick a diffrent color randomlikely so as not to get used to it...
 
## Technology choices
  __HUE__
  Hue may be a **little bit expensive**. However it has a hella well-provided API which should perfectly fit my present and future needs. An important point is that Hue is working over a wifi bridge where all the hue elements are connected. This is great since I don't want my phone to just be a remote-control, by using the Hue's API, I can give order to every single part of the system through the hue bridge so that my raspberry can control everything. An other point is that, as it's a famous brand, there are more chance that the products and the API support won't be discontinued in the futur.

>There are some alternative to Hue (one is cheaper) but I really need to know if I can do everything I want. http://www.makeuseof.com/tag/philips-hue-alternatives/

**Important Staff before buying anything :** 
Here is what's really important :
- The product I buy may be expensive, so I need it to have a good life expectancy so as not to rebuy it. (Broken Bulbs?)
- The technology I choose need to be working over Wireless support and being centralized on my own server (via the provided bridge)
- The API support need to be continued and efficient
- Privacy DOES matter. What about information collection? Does the brand collect anything? No need so I don't want it to.

__What about my server techno?__
Obviously, AM NOT SURE. If all I need is a quick bootable control pad/IA over web protocol, Rails should fit perfectly.
But what If I want a really BIG architecture? Like a 9-layer scheme with MOM as middleware... NAH, just a simple web app should be OK since Rails is scalable enough. 
  
## Phototherapy

  - I found out on the internet that smooth warm color help to wake up. Something like sunshine colors. No cold colors!
  - Green helps to focus
  - Orange raise good mood!
  - Coral color can be a good pink-orange-red compromise
  - Because of Brain's habbit, the colors have to not be the same every morning.
  

# Please study the following projects:

- https://www.hackster.io/philips-hue/products/hue
- Wrist Switch
In term of connectivity, this project is similar to what I wanna do. Dig a bit deeper to check what techno they use.

- Owly
This looks like serious staff, may be very interesting to have a further look later if I wanna all my house to be smart.



links:
  - http://gizmodo.com/a-light-up-alarm-completely-changed-my-life-1535668863
  - http://www.lumie.com/blogs/quick-guides/6302482-light-therapy-for-better-sleep

# EVOLUTION

## About the rooms

- The lights will be part of groups called __room__.
- A room is owned by a user. 
- The __owner__ can authorized other users to use the most of the functionnalities of the room as a __guest__.
- A room has a range of __ambiances__ which can be *public* or *private*. Basically an ambiance is a lights set_up for a room.
- A public ambiance can be acquired by another user so as he/she can put it in his/her own room and even make it private if he/she wants to.

##About the roles
To use the API, different __roles__ will be managed through Devise. Some roles can be inherited, for instance the **god_powers** role rules : it enables fullcontrol on anything.
The **room_owner** is kinda special has it's valid only if the given room id is indeed owned by the user. So this is a functionnal check not an access validation so as it will not be managed by Devise but with the core application. In the same way, a **room_guest** will be authorized only if he/she belongs to the room's guest.
Only a **god_powers** roled user can change a **room_owner**.

#API EndPoint

>Here is the list of all functionnalities that any authorized device can call through app (phone or web).
  
- [ ] See with Devise if there is a point to add a namespace in the API path to handle access control.

## Lights control  

|description|method|path|parameters|returned value|required role|
|-----------|------|----|----------|-------------------|--------------|
|Turn on/off a specific light|PATCH|/api/lights/[id]|boolean:on|JSON:object|special:room_owner|
|Change a specific light color|PATCH|/api/lights/[id]|string:color|JSON:object|special:room_owner|
|Print all info about every single light connected to HUE|GET|/api/lights|nil:nil|JSON:object|god_powers|
|Print all info about every light which is not affected to a room yet|GET|/api/lights|nil:nil|JSON:object|god_powers|

## Room control

|description|method|path|parameters|returned value|required role|
|-----------|------|----|----------|-------------------|--------------|
|Turn on all the lights of a room|PATCH|/api/room/[id]|boolean:on|JSON:object|special:room_owner, special:room_guest|
|Pick an ambiance in the available ones for a room|PATCH/PUT|/api/room/[id]/ambiances|string:ambiance|JSON:object|special:room_owner, special:room_guest|
|List all ambiances available for a room|GET|/api/room/[id]/ambiances|nil:nil|JSON:object|special:room_owner, special:room_guest|
|Register a light in a room|POST|/api/room/[id]/add|index:id_light|JSON:object|special:room_owner, special:room_guest|
|Remove a light in a room|DELETE|/api/room/[id]/rem|index:id_light|JSON:object|special:room_owner , special:room_guest|
|List lights in a room|GET|/api/room/[id]|nil:nil|JSON:object|special:room_owner, special:room_guest|
|Change room owner|PATCH|/api/room/[id]/owner|int:id_user|JSON:object|god_powers|
|add a guest to the room|POST|/api/room/[id]/guests/add|int:id_user|JSON:object|special:room_owner|
|remove a guest from the room|POST|/api/room/[id]/guests/add|int:id_user|JSON:object|special:room_owner|
|Save an ambiance to the room's available ones|POST|/api/room/[id]/ambiances/add|JSON:ambiance|JSON:object|special:room_owner|

## Ambiance Control

|description|method|path|parameters|returned value|required role|
|-----------|------|----|----------|-------------------|--------------|
|Get the current ambiance of a room|GET|/api/room/[id]/guests/add|int:id_user|JSON:object|special:room_owner|

## Material

Can be HELLA cool to add a material management. Like this item can support XXVolt zith a XX watt power, etc.

## AI Control

|description|method|path|parameters|returned value|required role|
|-----------|------|----|----------|-------------------|--------------|
|Print AI config file|GET|/api/ai/config|nil:nil|JSON:object|jinx_master|
|Replace old AI config file|POST|/api/ai/config|JSON:object|JSON:object|jinx_master|

## User Control

|description|method|path|parameters|returned value|required role|
|-----------|------|----|----------|-------------------|--------------|
|list all authorized users|GET|/api/users/|nil:nil|JSON:object|user_management|
|add an authorized user to the list|POST|/api/users/add|JSON:object|JSON:object|user_management|
|update a user|PATCH|/api/users/[id]/add|JSON:object|JSON:object|user_management|
|remove a user permanently|DELETE|/api/users/[id]/rem|nil:nil|JSON:object|user_management|
|freeze all roles of a specific user|POST|/api/users/[id]/freeze|boolean:frozen|JSON:object|god_powers|
