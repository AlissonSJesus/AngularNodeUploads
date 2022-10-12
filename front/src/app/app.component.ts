import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileForm!: FormGroup;
  arquivo: any;
  url = 'http://localhost:3000'

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  configureForm() {
    this.fileForm = this.formBuilder.group({
      file: ['', Validators.required]
    });
  }

  onChange(event: any) {
    if (event.target.files.length > 0) { 
      const file = event.target.files[0];
      console.log(file);
      this.arquivo = file;
    }
  }

  onClick() {
    const formData = new FormData();
    formData.append('file', this.arquivo);
    this.http.post(`${this.url}/file`, formData).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    });
  }
}
