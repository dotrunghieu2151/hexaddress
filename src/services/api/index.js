
import axios from 'axios';
import api from './api.service';

export const apiService = api({ http: axios });

