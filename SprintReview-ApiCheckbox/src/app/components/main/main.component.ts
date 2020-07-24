import { Component, OnInit } from '@angular/core';
import { CheckboxService } from '../../services/checkbox.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public policyId :number = 0
  public productId :number
  public birthday :Date
  public identityNumber : number
  public jsonData :any 
  
  constructor(private checkbox: CheckboxService) { }

  ngOnInit(): void {

    let productType = this.policyId != 0? "colectiva" : "individual"
    this.getPolicyMock(productType);
  }

  public createPolicy(){
    this.cleanData("error");
    this.cleanData("success");

    let productType = this.policyId != 0? "colectiva" : "individual"

    this.getPolicyMock(productType);

    let birthdateParsed = `${this.birthday.toString()}T14:13:50.782Z`

    this.jsonData.role.birthDate = birthdateParsed

    this.createCheckboxPolicy(JSON.stringify(this.jsonData))
  }

  private setJsonData(data :any){
    this.jsonData = data;
  }

  private getPolicyMock(type :string):void{
    this.checkbox.getJsonFile(type).subscribe((data: any) => {
      this.setJsonData(data)
    },
    err => {
        console.error("Error en request", err)
    });
  }

  private createCheckboxPolicy(payload :string){
    this.checkbox.addPolicy(payload)
    .subscribe((data: any) =>{ 
      
      let element = document.getElementById("success") as HTMLElement;
      element.style.display= "block"

      element.innerHTML += "Created: <br>" + JSON.stringify(data);

      console.log(data)
    }, 
    err => {
      
      this.showMessage("error", err.error)

      console.log(err);
      
    });
  }

  private showMessage(id: string, data :string[]){
    let element = document.getElementById(id) as HTMLElement;
    element.style.display= "block"

      for(let error of data){
        element.innerHTML += error["description"]

        if(error["id"]== 412)
          element.innerHTML += "<p> (Tiene más de 70 años) </p>"
      }
      
  }

  private cleanData(id :string){
    let element = document.getElementById(id) as HTMLElement;
    element.style.display= "none"
    element.innerHTML = "";
  }
  

}
