import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-upload',
  templateUrl: './reactive-upload.component.html',
  styleUrls: ['./reactive-upload.component.scss']
})
export class ReactiveUploadComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  uploadForm: FormGroup;
  file: string;
  myFiles: string[] = [];


  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: [''],
      prodName: [''],
      prodDesc: ['']
    });
  }
  onFileSelect(event) {
    for (let i = 0; i < (event.target.files.length); i++) {
      const file = event.target.files[i];
      this.myFiles.push(event.target.files[i]);
      this.uploadForm.get('profile').setValue(this.myFiles);
    }
    console.log(this.myFiles);
  }
  onSubmit() {
    const formData = new FormData();
    for (let i = 0; i < (this.myFiles.length); i++) {
      // formData.append('myFile', this.uploadForm.get('profile').value);
      formData.append('myFile[]', this.myFiles[i]);

    }
    formData.append('prodName', this.uploadForm.get('prodName').value);
    formData.append('prodDesc', this.uploadForm.get('prodDesc').value);
    this.http.post<any>('http://www.chocomonks.com/upload.php', formData).subscribe(event => {
      console.log(event);
    });
  }

}
