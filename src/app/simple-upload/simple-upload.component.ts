import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-simple-upload',
  templateUrl: './simple-upload.component.html',
  styleUrls: ['./simple-upload.component.scss']
})
export class SimpleUploadComponent implements OnInit {

  constructor(private http: HttpClient) { }
  selectedFile: File;

  ngOnInit() {
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  onUpload() {
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this.http.post('http://www.chocomonks.com/upload.php', uploadData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      console.log(event);
    });
  }

}
