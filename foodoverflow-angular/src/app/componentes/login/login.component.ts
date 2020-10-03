import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public usuarioService : UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/busqueda'])
  }
}
