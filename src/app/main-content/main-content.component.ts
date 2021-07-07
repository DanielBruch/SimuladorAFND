import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  parametro = "L(M) = {w ∈ {a,b} | w termina em aaa }"
  form: FormGroup;
  started = false;
  position = 0
  index = 0;
  entrada = ""
  leituraAtual = ""
  proximaLeitura = ""
  output = "";
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      entrada: '',
    });
  }

  ngOnInit(): void {
  }
  async start() {
    await this.delay(300);
    if (this.form.controls.entrada.value) {
      this.started = true;
      this.entrada = this.form.controls.entrada.value
      this.proximaLeitura = this.entrada.slice(this.index, this.index + 1);
      this.AddOutput(`Iniciando processo de validação da entrada '${this.entrada}'`)
      this.AddOutput(`Utilizando a regra: ${this.parametro}`)
      this.AddOutput("-----------")

    }
    else
      alert("Informe uma entrada valida")
  }
  AddOutput(msg: string) {
    this.output += msg + "\r\n"
  }
  stop() {
    this.started = false;
    this.index = 0
    this.position = 0
    this.leituraAtual = "";
    this.output = "";
  }
  StyleItem(item: number) {
    if (item == this.position && this.started) {
      return { 'background-color': 'greenyellow' }
    }
    return { 'background-color': 'wheat' }
  }
  next() {
    this.leituraAtual = this.entrada.slice(this.index, this.index += 1);
    this.proximaLeitura = this.entrada.slice(this.index, this.index + 1);
    if (this.leituraAtual != "")
      this.CheckQ();
    else
      this.finish();
  }
  finish() {
    if (this.position == 3) {
      alert("Entrada Valida. Chegou ao Final")
    } else {
      alert("Entrada não Valida. Não chegou ao final")
    }
  }
  delay(ms: number): Promise<number> {
    return timer(ms).pipe().toPromise();
  }

  private CheckQ() {
    var pontoAtual = "Q" + this.position
    var newPonto = "Q" + (this.position + 1)
    if (this.position == 3)
      pontoAtual = "Qf"
    if (this.position + 1 >= 3)
      newPonto = "Qf"
    if (this.leituraAtual == "a") {
      if (this.position != 3)
        this.position += 1
    }
    else if (this.leituraAtual == "b"){
      this.position = 0;
      newPonto = "Q0"
    }else {
      alert("Valor não Valido Lido. Parando")
      this.stop();
    }
    var message = `Valor Lido: ${this.leituraAtual}. Movimentando-se de ${pontoAtual} para ${newPonto}`
    this.AddOutput(message);
  }
}
