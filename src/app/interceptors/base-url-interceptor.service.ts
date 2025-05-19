import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL, BACKEND_HOST } from '../app.constant';

@Injectable()
export class BaseUrlInterceptorService  implements HttpInterceptor{

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const startTime = Date.now();
    const host = this.isUrlMatch(request.urlWithParams) ? BACKEND_HOST.sendSmsServiceHostname:"";
    request = request.clone({url: `${host}${request.urlWithParams}`});
    return next.handle(request).pipe(
      tap( event => {
          if(event instanceof HttpResponse){
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;

            console.log(`Request for ${request.url} took ${elapsedTime} milli seconds`)
          }
      })
    );
  }

  private isUrlMatch(targetPath: string): boolean {
    const paths = [...Object.values(API_URL.authURLs),...Object.values(API_URL.senderURLs),...Object.values(API_URL.templateURLs), ...Object.values(API_URL.commonUrls),...Object.values(API_URL.userURLs)];
    for (const path of paths) {
      // 1. Check for exact match (no placeholders)
      if (path === targetPath) {
        return true;
      }
  
      // 2. Check for match with placeholders replaced
      const pathParts = path.split("/");
      const targetParts = targetPath.split("/");
  
      if (pathParts.length !== targetParts.length) {
        continue; // Length mismatch, can't be a match
      }
  
      let match = true;
      for (let i = 0; i < pathParts.length; i++) {
        const pathPart = pathParts[i];
        const targetPart = targetParts[i];
  
        // Check if pathPart is a placeholder (e.g., {id}, {name})
        if (pathPart.startsWith("{") && pathPart.endsWith("}")) {
          // It's a placeholder, so it matches any non-empty targetPart
          if (targetPart === "") { // Or check for null/undefined if needed
            match = false;
            break;
          }
          continue; // Placeholder matches, move to the next part
        } else if (pathPart !== targetPart) {
          match = false;
          break;
        }
      }
  
      if (match) {
        return true; // Found a match!
      }
    }
  
    return false; // No match found
  }

}
