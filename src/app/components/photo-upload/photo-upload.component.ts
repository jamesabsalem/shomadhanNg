import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

export class InputFile {
  // public name: string;
  // public file: File;
  // public preview: string;

  constructor(public name: string, public preview: string, public file?: File) {
    this.name = name;
    this.preview = preview;
    this.file = file;
  }
}

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {
  // files = [];
  @Output() change = new EventEmitter<Array<InputFile>>();
  @ViewChild('fileInput') fileInput: ElementRef;
  public files = new Array<InputFile>();

  constructor() {}

  ngOnInit() {}

  onSelectFile(event) {
    const { name } = event.target.files[0];

    const alreadyExist = this.files.find(x => x.name === name);
    if (!!alreadyExist) {
      console.log('Already added');
      return;
    }

    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    if (event.target.files && file) {
      const reader = new FileReader();

      reader.readAsDataURL(file); // read file as data url

      reader.onload = (_event: any) => {
        const _url = _event.target.result;
        const inputFile = new InputFile(name, _url, file);
        this.files.push(inputFile);
        this.fileInput.nativeElement.value = '';
        this.change.emit(this.files);
      };
    }
  }

  onDelete(file) {
    const foundFile = this.files.indexOf(file);
    console.log('index::' + foundFile);
    this.files.splice(foundFile, 1);
    this.change.emit(this.files);
  }
}
