import { Injectable, EventEmitter } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Session } from '../model/session';
import { Subject } from 'rxjs';

@Injectable()
export class CommonService {
    public isAuthorized: boolean = false;
    public role: string;
    private user: any;
    private session : Session;
    public eventEmit : EventEmitter<Session> = null;
    configUrl = 'http://localhost:3000/';
    constructor(private http: HttpClient, private messageService: MessageService) {
      this.eventEmit = new EventEmitter<Session>();
    }
    isAuthenticateUser(username: string, password: string) {

        let obj = { "UserName": username, "Password": password };
        return this.http.post(this.configUrl + 'authenticate', obj);
    }

    isUserLoggedIn(){
        let sessionId = window.localStorage.getItem("SessionId");
        var subject = new Subject<boolean>()
        if(sessionId)
        {
            return this.http.get(this.configUrl + 'authenticate/' + sessionId).subscribe((response:any)=>{
                if(response){
                    this.setSession(response);
                    this.isAuthorized = true;
                    this.eventEmit.next(this.session);
                    subject.next(true);
                }
                else
                {
                    subject.next(false);
                }
            });
        }
        else{
            subject.next(false);
        }
        return subject.asObservable();
    }

    isAdminUser() {
        if (this.user) {
            if (this.user.Role.Name === "Admin") {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

   clearSession()
   {
       this.http.delete(this.configUrl + 'authenticate/'+ window.localStorage.getItem("SessionId")).subscribe((response)=>{
           window.localStorage.clear();
        this.session = null;
        this.user = null;
        this.isAuthorized = false;
       })
       
   }

    emitMessage(severity: string, summary: string, detail: string) {
        this.messageService.add({ severity: severity, summary: summary, detail: detail });
    }

    setSession(session: Session) {
        if(session)
        {  
            this.session = session;
            this.user = this.session.User;
            window.localStorage.setItem("SessionId",this.session._id);
        }
    }

    getUser()
    {
        if(this.user)
        return this.user;
    }
} 