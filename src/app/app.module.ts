import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import store  from '../redux/store';
import { Globals } from '../services/globals'
// import { rootReducer } from './reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftSideComponent } from '../components/left-side/left-side.component';
import { RightSideComponent } from '../components/right-side/right-side.component';

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
    LeftSideComponent,
    RightSideComponent
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
