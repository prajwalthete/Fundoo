import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importing HttpClient and HttpHeaders from '@angular/common/http' for making HTTP requests
import { Injectable } from '@angular/core'; // Importing Injectable decorator from '@angular/core' for creating injectable services
import { Observable } from 'rxjs/internal/Observable'; // Importing Observable from 'rxjs/internal/Observable' for handling asynchronous data streams

@Injectable({
  providedIn: 'root' // Providing the service at the root level
})
export class HttpService {
  private BaseUrl: string = 'https://localhost:7178/api/'; // Setting the base URL for API requests

  // Creating an authentication header with JWT token from local storage
  private authHeader = new HttpHeaders({
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('AuthToken') || ''}`, // Retrieving JWT token from local storage
  });

  constructor(public httpClient: HttpClient) { } // Constructor injecting HttpClient for making HTTP requests

  // Method for sending a login request
  loginUser(endpoint: string, data: Object): Observable<any> {
    return this.httpClient.post<any>(this.BaseUrl + endpoint, data); // Making a POST request to login endpoint
  }

  // Method for sending a registration request
  registerUser(endpoint: string, data: Object): Observable<any> {
    return this.httpClient.post<any>(this.BaseUrl + endpoint, data); // Making a POST request to register endpoint
  }

  // Method for getting all notes
  getAllNotes(endpoint: string): Observable<any> {
    return this.httpClient.get<any>(this.BaseUrl + endpoint, { headers: this.authHeader }); // Making a GET request to retrieve all notes
  }

  // Method for adding a new note
  addNote(endpoint: string, data: Object): Observable<any> {
    return this.httpClient.post<any>(this.BaseUrl + endpoint, data, { headers: this.authHeader }); // Making a POST request to add a new note
  }

  // Method for moving a note to trash
  trashNote(endpoint: string): Observable<any> {
    return this.httpClient.patch<any>(this.BaseUrl + endpoint, {}, { headers: this.authHeader }); // Making a PATCH request to move a note to trash
  }

  // Method for archiving a note
  archiveNote(endpoint: string): Observable<any> {
    return this.httpClient.patch<any>(this.BaseUrl + endpoint, {}, { headers: this.authHeader }); // Making a PATCH request to archive a note
  }

  // Method for deleting a note
  deleteNote(endpoint: string): Observable<any> {
    return this.httpClient.delete<any>(this.BaseUrl + endpoint, { headers: this.authHeader }); // Making a DELETE request to delete a note
  }

  // Method for updating a note
  updateNote(endpoint: string, data: Object): Observable<any> {
    return this.httpClient.put<any>(this.BaseUrl + endpoint, data, { headers: this.authHeader }); // Making a PUT request to update a note
  }
  
  // Method for sending a forgot password request
  forgotPassword(endpoint: string, data: Object): Observable<any> {
    return this.httpClient.post<any>(this.BaseUrl + endpoint, data); // Making a POST request to forgot password endpoint
  };
}
