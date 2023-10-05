import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-asientos-detail',
  templateUrl: './asientos-detail.component.html',
  styleUrls: ['./asientos-detail.component.css']
})
export class AsientosDetailComponent implements OnInit {
  asientosForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.asientosForm = this.fb.group({
      cuentas: [''],
      debe: [''],
      haber: ['']
    });
  }

  ngOnInit() {}
}
