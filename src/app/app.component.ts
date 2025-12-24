import { Component } from '@angular/core';
import readXlsxFile, { Row } from 'read-excel-file';
import { MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  imports: [MatTableModule, ScrollingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'xlsx-test';

  displayedColumns: string[] = [];
  data: Row[] = [];

  onFileChange(event: any) {
    const file = event.target.files[0];
    if(!file) return;

    readXlsxFile(file).then((data: any[]) => {
      this.displayedColumns = data[0];
      this.data = data.slice(1);
    })
  }

  ispisFajla(file: File) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      const text = new TextDecoder().decode(buffer);
      console.log(text); // readable if the file is text-based
    };
  }
}
