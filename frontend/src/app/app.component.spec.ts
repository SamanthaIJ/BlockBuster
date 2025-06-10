import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it(`should have the 'frontend' title`, () => {
    expect(spectator.component.title).toEqual('frontend');
  });
});