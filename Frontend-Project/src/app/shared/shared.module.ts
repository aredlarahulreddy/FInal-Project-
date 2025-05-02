import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';  // Import HeaderComponent

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],  // Export HeaderComponent so it can be used in other modules
  imports: [CommonModule]
})
export class SharedModule {}
