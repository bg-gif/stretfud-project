import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Dimensions,
  ScrollView
} from 'react-native';

class OrderCard extends Component {
  constructor() {
    super();
    this.state = {
      confirmed: false
    };
  }

  render() {
    return (
      <View style={styles.menuCard}>
        <Text>Order</Text>
        {/* <View style={styles.menuItemHeader}>
          <Text style={styles.menuItemHeaderText}>{name}</Text>
          <Text style={styles.menuItemHeaderText}>£{price}</Text>
        </View>
        <View style={styles.menuDetails}>
          <View style={styles.detailsContainer}>
            <Text style={styles.descriptionText}>{description}</Text>
            {gluten_free === true && (
              <Text style={styles.descriptionText}>GF</Text>
            )}
            {vegan === true && <Text style={styles.descriptionText}>VG</Text>}
            {vegetarian === true && (
              <Text style={styles.descriptionText}>V</Text>
            )}
          </View>

          <View style={styles.availabilityButtonContainer}>
            <Text style={styles.availabilityText}>Available: </Text>
            <Switch
              onValueChange={handleAvailability}
              name={menu_item_id}
              value={available}
            />
          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={() => {}}>
            <Text style={styles.buttonText}>Orders</Text>
          </TouchableOpacity> */}
      </View>
    );
  }
}

export default VendorMenuCard;

const styles = StyleSheet.create({
  menuCard: {
    flexDirection: 'column',
    borderColor: 'rgba(175, 15, 103, 1)',
    borderRadius: 5,
    borderWidth: 4,
    marginBottom: 15,
    marginTop: 15
  },
  menuDetails: {
    flexDirection: 'row'
  },
  detailsContainer: {
    flex: 2,
    padding: 5
  },
  availabilityButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10
  },
  menuItemHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(175, 15, 103, 1)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5,
    width: Dimensions.get('window').width - 30
  },
  menuItemHeaderText: {
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 25
  },
  descriptionText: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 17,
    color: 'rgba(175, 15, 103, 1)'
  },
  availabilityText: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 17,
    color: 'rgba(175, 15, 103, 1)'
  }
});
