import { Container, Assets, Text } from 'pixi.js';
import { GameManager } from '@core/Manager';
import { IScene } from '@/interfaces';
import { CircularProgressBar } from '@pixi/ui';
import { manifest, theme } from '@/config';

export class InitialScene extends Container implements IScene {
  private manager = GameManager.getInstance();

  private loaderValue = 0;
  private isFilling: Boolean = true;
  private readonly loader: CircularProgressBar;
  private readonly text: Text;

  constructor() {
    super();

    this.text = new Text({
      text: 'Initial loading...',
      style: {
        fontSize: 20,
        fill: theme.neutral.white,
        align: 'center',
      },
    });

    this.text.x = this.manager.getWidth() / 2 - 64;
    this.text.y = this.manager.getHeight() / 2 + 55;

    this.addChild(this.text);

    this.loader = new CircularProgressBar({
      backgroundColor: theme.neutral.black,
      backgroundAlpha: 0.4,
      lineWidth: 12,
      fillColor: theme.neutral.white,
      fillAlpha: 0.7,
      radius: 40,
      value: 0,
      cap: 'round',
    });

    this.loader.x = this.manager.getWidth() / 2;
    this.loader.y = this.manager.getHeight() / 2;

    this.addChild(this.text);
    this.addChild(this.loader);

    this.initializeLoader().then(() => {
      this.assetsLoaded();
    });
  }

  private async initializeLoader(): Promise<void> {
    await Assets.init({ manifest: manifest });
    const bundleIds = manifest.bundles.map((bundle) => bundle.name);
    await Assets.loadBundle(bundleIds);
  }

  private assetsLoaded(): void {
    // Example of the logic after loading of assets
    // const manager = GameManager.getInstance();
    // const storage = new StorageService();
    // const token = storage.getToken();
    // const scene = token ? new MenuScene() : new AuthScene();
    // manager.changeScene(scene);

    // change scene right here
    console.log('Assets have been loaded!');
  }

  update(_framesPassed: number): void {
    this.isFilling ? this.loaderValue++ : this.loaderValue--;
    if (this.loaderValue >= 100) {
      this.isFilling = false;
    } else if (this.loaderValue <= 0) {
      this.isFilling = true;
    }

    this.loader.progress = this.loaderValue;
    this.loader.rotation += 0.1;
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    this.loader.x = this.manager.getWidth() / 2;
    this.loader.y = this.manager.getHeight() / 2;

    this.text.x = this.manager.getWidth() / 2 - 64;
    this.text.y = this.manager.getHeight() / 2 + 55;
  }
}
