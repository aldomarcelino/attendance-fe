import AsyncStorage from "@react-native-async-storage/async-storage";

// Utility type for the value that will be stored in AsyncStorage
type StorageValue = string | number | boolean | object | null;

export const setLocalStorage = async (
  key: string,
  value: StorageValue
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item:", error);
  }
};

export const getLocalStorage = async (key: string): Promise<StorageValue> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};

export const removeLocalStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

export const mergeItem = async (
  key: string,
  value: StorageValue
): Promise<void> => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error merging item:", error);
  }
};

export const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};

export const getAllItems = async (): Promise<Record<string, StorageValue>> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items.reduce<Record<string, StorageValue>>(
      (accumulator, [key, value]) => {
        accumulator[key] = value != null ? JSON.parse(value) : null;
        return accumulator;
      },
      {}
    );
  } catch (error) {
    console.error("Error getting all items:", error);
    return {};
  }
};
