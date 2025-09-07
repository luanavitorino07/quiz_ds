import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 60,
  },
  logoImage: {
    width: 150,
    height: 147,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontFamily: 'LexendSemiBold',
    
    color: '#1B2C46',
    marginBottom: 50,
    
  },
  input: {
    width: '100%',
    height:60,
    backgroundColor: '#F8F9F9',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'LexendRegular',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.21,    
    elevation: 3,
  },
  button: {
    width: '100%',
    backgroundColor: '#1B2C46', 
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'LexendRegular',
    
  },
  placeholder: {
    width:"97.5%",    
    color: '#1B2C46',
    fontFamily: 'LexendRegular',
    marginBottom: 10,
  },
  questionStatement: {
    backgroundColor: "#DFE8F4",
    padding: '10%',
    borderRadius: 15,
    textAlign:'center',
    marginBottom: 20,
  },
  questionText: {
    fontFamily: 'LexendSemiBold',
    fontSize: 17,
    textAlign: 'center'
   },
  answersQuestion: {
    backgroundColor: '#F8F9F9',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3.5 },
    shadowOpacity: 0.21,    
    elevation: 6,
    marginBottom: 20,
  },
  answersQuestionText: {
    fontFamily: 'LexendRegular',
    textAlign: 'center',
    fontSize: 16,
    color: '#3A3F48',
  },
});

export default styles;
