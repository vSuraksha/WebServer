var map 
server_url = "ws://localhost:8000/ws/coordinates"

function initMap(){

	const uluru = { lat: -25.344, lng: 131.031 };
	map = new google.maps.Map(document.getElementById("map"),{zoom :16, center: uluru})
	new gps_device("device_one",map)

}
	
window.initMap = initMap


//TODO: Differentiate different markers using different colors, will need to read google documentation

class gps_device {
	constructor(device_name,map){
		this.device_name = device_name
		this.ws = new WebSocket(server_url+'/'+device_name+'/')
		this.ws.onmessage = this.onmessage.bind(this)
		this.ws.onopen = this.onopen.bind(this)
		this.map = map
		this.marker = new google.maps.Marker({ map: this.map,})
	}
	 onopen(e){

		let message = { "get_coord":true,}
		this.ws.send(JSON.stringify(message))
	 }

	onmessage(message){
		
		if (message.data === "null"){
			console.log(message.data)
			this.ws.send(JSON.stringify({"get_coord":true}))
			return
		}

		var coords = JSON.parse(message.data)
		if(typeof(coords) == "string"){
			coords = JSON.parse(coords)
		}
		let coord_obj = new google.maps.LatLng(coords.lat,coords["long"])
		this.marker.setPosition(coord_obj)
		this.map.setCenter(coord_obj)
		this.ws.send(JSON.stringify({"get_coord":true}))
		}

}
