import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cuentas-detail',
  templateUrl: './cuentas-detail.component.html',
  styleUrls: ['./cuentas-detail.component.css']
})
export class CuentasDetailComponent implements OnInit {

  cuentasForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  })
  constructor (private fb: FormBuilder) {  }

  ngOnInit() {
    
  }

}
