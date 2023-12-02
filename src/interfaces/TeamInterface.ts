import { TUser } from "./UserInterface";

export interface TTeamUser {
  user: TUser;
}
export interface TTeam {
  _id: string;
  team_name: string;
  members: TTeamUser[];
}
