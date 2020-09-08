import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {  NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: 'survey',
    loadChildren: () => import('../app/pages/pages.module')
      .then(m => m.PagesModule),
    runGuardsAndResolvers: 'always',
  },
  {
    path: '',
    redirectTo: 'survey/list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'survey/list',
    pathMatch: "full"
  },
];

const config: ExtraOptions = {
  useHash: false,
  // onSameUrlNavigation: 'ignore',
  onSameUrlNavigation: 'reload',
  //enableTracing: true,
  preloadingStrategy: PreloadAllModules
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  schemas: [
  ],
  providers: [
    //AuthGuard
  ],
})
export class AppRoutingModule {
}
