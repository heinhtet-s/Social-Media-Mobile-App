import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Typograhpy, WrapperStyle} from '../GlobalStyle';
import {COLORS} from '../theme/theme';
const categories = [
  'Category 1',
  'Category 2',
  'Category 3',
  'Category 4',
  'Category 5',
  'Category 6',
  'Category 7',
  'Category 8',
  'Category 9',
  'Category 10',
];
const {width, height} = Dimensions.get('window');
export default function HomeAllScreen() {
  return (
    <ScrollView style={WrapperStyle.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderTitle}>Learn</Text>
        <TouchableOpacity>
          <Text style={styles.seeMoreHeader}>Show More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        horizontal={true}
        style={{
          paddingLeft: 10,
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <Image
              style={styles.imageStyle}
              source={require('../assets/images/CardImage.jpeg')}
            />
            <View style={{paddingHorizontal: 12, paddingTop: 12}}>
              <Text style={styles.cardTitle}>
                This is the title. Lorem ipsum dolor
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '300',
                  color: COLORS.Text,
                  paddingTop: 12,
                  paddingBottom: 16,
                }}>
                This is the description. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed euismod.
              </Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  cardContainer: {
    borderRadius: 8,
    height: 200,
    width: width * 0.7,
    marginHorizontal: 10,
    backgroundColor: COLORS.White,
    overflow: 'hidden',
  },
  cardHeaderTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.Text,
  },
  seeMoreHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.Primary,
  },
  imageStyle: {
    height: 200,
    width: '100%',
    flex: 1,
    objectFit: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Text,
  },
});
