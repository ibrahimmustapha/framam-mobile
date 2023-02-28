import { SafeAreaView, View } from "react-native"
import MapView from "react-native-maps";

const DirectionScreen = () => {
    return (
        <SafeAreaView>
            <View>
                <MapView></MapView>
            </View>
        </SafeAreaView>
    )
}

export default DirectionScreen;