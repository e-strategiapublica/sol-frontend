import { Component } from '@angular/core';
import { RankingService } from 'src/services/ranking.service';


interface User {
  _id: number;
  name: string;
  email?:string;
  points: number;
  userId?: number;
}

interface UserWithRank extends User {
  rank: number;
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent {
  // loggedUser!: User;
  // rankingList: User[] = [];
  loggedUser!: UserWithRank;
  rankingList: UserWithRank[] = [];

  loggedUserPoints = [
    { name: 'Joao da Silva', email: 'joao@email.com', action: "Cadastramento e visualização", quantitative: "Sim", qualitative: "Não", points: 10 },
    { name: 'Joao da Silva', email: 'joao@email.com', action: "Entrar no processo licitatório", quantitative: "Sim", qualitative: "Não", points: 5 },
    { name: 'Joao da Silva', email: 'joao@email.com', action: "Upload de documento", quantitative: "Sim", qualitative: "Sim", points: 2 },
    { name: 'Joao da Silva', email: 'joao@email.com', action: "Ganho de licitação", quantitative: "Não", qualitative: "Sim", points: 5 },
    { name: 'Joao da Silva', email: 'joao@email.com', action: "Aceite de revisão", quantitative: "Sim", qualitative: "Não", points: 1 },
  ];
  

  constructor(
    private rankingService: RankingService
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
    this.getRanking();
  }

  getLoggedUser(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.loggedUser = JSON.parse(userData);
    }
  }

  getRanking(): void {
    this.rankingService.getRanking().subscribe((data: any[]) => {
      // Adiciona o rank após ordenar os usuários por pontos
      this.rankingList = data
      .sort((a, b) => b.points - a.points)
      .map((user, index) => ({ ...user, rank: index + 1 }));
      console.log(this.rankingList)

      // Localiza o usuário logado com id = 1
      this.loggedUser = this.rankingList.find(user => user._id === 1)!;
    });
  }
}
