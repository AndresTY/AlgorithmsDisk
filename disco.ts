class Petition{
	name:string;
	disk:number;
	
	constructor(_name:string, _disk:number){
		this.name=_name;
		this.disk=_disk;
	}
}

class FIFO{
	diskSize:number;
	Point:number;
	blockScrolling:number;
	petitionList:Array<Petition>;

	constructor(_diskSize:number, _startPoint:number){
		this.diskSize = _diskSize;
		this.Point = _startPoint;
		this.petitionList=[];
		this.blockScrolling=0;
	}

	fillQueue(newPetition:Petition){
		newPetition.disk <= this.diskSize ? this.petitionList.push(newPetition):console.log(`the request ${newPetition.name} isn't on the disk`);
	}

	exec(){
		this.petitionList.forEach((a)=>{
			console.log(`from ${this.Point} to ${a.disk}`);
			this.blockScrolling += Math.abs(this.Point-a.disk);
			this.Point = a.disk;
		});
		console.log(`Block scrolling: ${this.blockScrolling}`)
	}
}

class SSTF{
	diskSize:number;
	Point:number;
	blockScrolling:number;
	petitionList:Array<Petition>;
	shortestRoute:number;
	temporalPoint:Petition;

	constructor(_diskSize:number, _startPoint:number){
		this.diskSize = _diskSize;
		this.Point=_startPoint;
		this.petitionList=[];
		this.blockScrolling=0;
	}

	fillQueue(newPetition:Petition){
		newPetition.disk <= this.diskSize ? this.petitionList.push(newPetition):console.log(`the request ${newPetition.name} isn't on the disk`);
	}

	exec(){
		while(this.petitionList.length!=0){
			this.shortestRoute=Infinity;
			for(var a of this.petitionList){
				if(Math.abs(this.Point-a.disk)< this.shortestRoute){
					this.temporalPoint=a;
					this.shortestRoute=Math.abs(this.Point-a.disk);
				}
			}

			this.petitionList.splice(this.petitionList.indexOf(this.temporalPoint),1);
			console.log(`from ${this.Point} to ${this.temporalPoint.disk}`);
			this.blockScrolling += this.shortestRoute;
			this.Point= this.temporalPoint.disk;
		}

		console.log(`Block scrolling: ${this.blockScrolling}`);

	}
}

class SCAN{
	diskSize:number;
	Point:number;
	blockScrolling:number;
	petitionList:Array<Petition>;
	

	constructor(_diskSize:number, _startPoint:number){
		this.diskSize = _diskSize;
		this.Point = _startPoint;
		this.petitionList=[];
		this.blockScrolling=0;
	}
	
	fillQueue(newPetition:Petition){
		newPetition.disk <= this.diskSize ? this.petitionList.push(newPetition):console.log(`the request ${newPetition.name} isn't on the disk`);
	}

	exec(){
		var travel:number = this.Point;
		var direction:number;
		travel<this.diskSize/2 ? direction=-1: direction= 1;
		while(this.petitionList.length!=0){
			this.blockScrolling+=1;
			this.petitionList.forEach((a)=>{
				if (a.disk==travel){
					this.petitionList.splice(this.petitionList.indexOf(a),1);
					console.log(`complete ${a.name} in ${a.disk}`);
				}
			});

			if (travel == 0 || travel == this.diskSize){
				direction = direction * (-1);
			}
			travel += direction;
		}
		console.log(`Block scrolling: ${this.blockScrolling}`);
	}
}

class CSCAN{
	diskSize:number;
	Point:number;
	blockScrolling:number;
	petitionList:Array<Petition>;

	constructor(_diskSize:number,_startPoint:number){
		this.diskSize=_diskSize;
		this.Point=_startPoint;
		this.petitionList=[];
		this.blockScrolling=0;
	}

	fillQueue(newPetition:Petition){
		newPetition.disk <= this.diskSize ? this.petitionList.push(newPetition):console.log(`the request ${newPetition.name} isn't on the disk`);
	}

	exec(){
		var travel:number = this.Point;
		var direction:number=1;
		while(this.petitionList.length!=0){
			this.blockScrolling+=1;
			this.petitionList.forEach((a)=>{
				if (a.disk==travel){
					this.petitionList.splice(this.petitionList.indexOf(a),1);
					console.log(`complete ${a.name} in ${a.disk}`);
				}
			});

			if (travel == this.diskSize){
				travel = 0;
				this.blockScrolling+=this.diskSize;
			}
			travel += direction;
		}
		console.log(`Block scrolling: ${this.blockScrolling}`);
	}
}

class LOOK{
	diskSize:number;
	Point:number;
	blockScrolling:number;
	petitionList:Array<Petition>;

	constructor(_diskSize:number, _startPoint:number){
		this.diskSize=_diskSize;
		this.Point=_startPoint;
		this.blockScrolling=0;
		this.petitionList=[];
	}

	fillQueue(newPetition:Petition){
		newPetition.disk <= this.diskSize ? this.petitionList.push(newPetition):console.log(`the request ${newPetition.name} isn't on the disk`);
	}

	exec(){
		var travel:number=this.Point;
		var direction:number;
		var numbers:Array<number> = this.petitionList.map((a)=>a.disk);
		this.Point>this.diskSize/2 ? direction = 1: direction = -1;
		while(this.petitionList.length != 0){
			this.blockScrolling+=1;
			this.petitionList.forEach((a)=>{
				if(a.disk==travel){
					this.petitionList.splice(this.petitionList.indexOf(a),1);
					console.log(`complete ${a.name} in ${a.disk}`);
				}
			});

			if(travel == Math.min.apply(null,numbers) || travel == Math.max.apply(null,numbers)){
				direction *= -1;
			}
			travel += direction;				
		}
		console.log(`Block scrolling: ${this.blockScrolling}`);
	}
}
