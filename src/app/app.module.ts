import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import store  from '../redux/store';
import { Globals } from '../services/globals'
// import { rootReducer } from './reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from '../components/main/main.component';
import { NotesListComponent } from '../components/notes-list/notes-list.component';
import { NotesInputComponent } from '../components/notes-input/notes-input.component';

interface IAppState {
  /* ... */
}

// export const store: Store<IAppState> = createStore(
//   // rootReducer,
//   applyMiddleware(createLogger()),
// );

@NgModule({
  declarations: [
    AppComponent,    
    MainComponent,
    NotesListComponent,
    NotesInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    FormsModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // constructor (ngRedux: NgRedux<IAppState>) {
  //   ngRedux.provideStore(store)
  // }
}
