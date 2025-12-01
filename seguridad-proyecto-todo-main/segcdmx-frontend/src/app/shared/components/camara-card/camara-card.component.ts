import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Camara } from '../../../core/models/camara.model';
import { CamarasService } from '../../../core/services/camaras.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-camara-card',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule],
  templateUrl: './camara-card.component.html',
  styleUrl: './camara-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CamaraCardComponent {
  @Input({ required: true }) camara!: Camara;

  isEditing = false;
  tempIp = '';

  constructor(
    private camarasService: CamarasService,
    private sanitizer: DomSanitizer
  ) { }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.tempIp = this.camara.ipConfigurada || '';
    }
  }

  saveIp(): void {
    if (this.tempIp.trim()) {
      this.camara.ipConfigurada = this.tempIp.trim();
      this.camarasService.saveIp(this.camara.id, this.camara.ipConfigurada);
    }
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  getStreamUrl(): SafeResourceUrl | string {
    if (this.camara.ipConfigurada) {
      let ip = this.camara.ipConfigurada.trim();

      // If user didn't provide protocol, add http://
      if (!ip.startsWith('http')) {
        ip = `http://${ip}`;
      }

      // If URL ends with common extensions or paths, use it as is
      if (ip.endsWith('/video') || ip.endsWith('.mjpg') || ip.endsWith('.jpg') || ip.endsWith('/videofeed')) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(ip);
      }

      // If it looks like a root URL (e.g. http://192.168.1.50:8080), append /video
      // Simple check: if it doesn't have a path after the port/host
      const urlParts = ip.split('/');
      if (urlParts.length === 3 || (urlParts.length === 4 && urlParts[3] === '')) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(`${ip}/video`);
      }

      return this.sanitizer.bypassSecurityTrustResourceUrl(ip);
    }
    return this.camara.urlImagen;
  }
}
