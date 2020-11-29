import * as Font from 'expo-font';

export async function bootstrap() {
    await Font.loadAsync({
        'Montserrat-Regular': require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat/Montserrat-Bold.ttf')
    })
}