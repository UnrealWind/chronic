import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const ss = sessionStorage

/*
 * 封装一下 sessionStorage 的常用操作
*/
@Injectable()
export class SessionStorageProvider {

  constructor(
    public http: HttpClient
  ) {
  }

  public get<T>(key: string): any {
    return JSON.parse(ss.getItem(key)) as T
  }

  public set(key: string, value: any): void {
    if(!value && value === undefined) return
    const arr = JSON.stringify(value)
    ss.setItem(key, arr)
  }

  public remove(key: string): void {
    if(!ss.getItem(key)) return
    ss.removeItem(key)
  }
}
