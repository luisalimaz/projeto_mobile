import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";

// Telas principais
import TelaPrincipal from "../layouts/TelaPrincipal";

// Telas de produto
import TelaCadProduto from "../layouts/TelaCadProduto";
import TelaListaProdutos from "../layouts/TelaListaProdutos";
import TelaDetalhesProduto from "../layouts/TelaDetalhesProduto";

// Telas de categoria
import TelaCadCategoria from "../layouts/TelaCadCategoria";

// Telas de fornecedor
import TelaCadFornecedor from "../layouts/TelaCadFornecedor";

// Telas de venda

// Define todas as rotas e os parâmetros esperados por cada uma
type RootStackParamList = {
  TelaPrincipal: undefined;
  TelaCadProduto: undefined;
  TelaListaProdutos: undefined;
  TelaDetalhesProduto: { produtoId: string };
  TelaCadCategoria: undefined;
  TelaCadFornecedor: undefined;
};

// Criação da stack de navegação
const Stack = createNativeStackNavigator<RootStackParamList>();

// Componente principal de navegação
const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TelaPrincipal"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
      <Stack.Screen name="TelaCadProduto" component={TelaCadProduto} />
      <Stack.Screen name="TelaListaProdutos" component={TelaListaProdutos} />
      <Stack.Screen name="TelaDetalhesProduto" component={TelaDetalhesProduto} />
      <Stack.Screen name="TelaCadCategoria" component={TelaCadCategoria} />
      <Stack.Screen name="TelaCadFornecedor" component={TelaCadFornecedor} />
    </Stack.Navigator>
  );
};

// Tipagens para props de navegação de cada tela
type PrincipalProps = NativeStackScreenProps<RootStackParamList, "TelaPrincipal">;
type CadastroProdutoProps = NativeStackScreenProps<RootStackParamList, "TelaCadProduto">;
type ListaProdutosProps = NativeStackScreenProps<RootStackParamList, "TelaListaProdutos">;
type DetalhesProdutoProps = NativeStackScreenProps<RootStackParamList, "TelaDetalhesProduto">;
type CadastroCategoriaProps = NativeStackScreenProps<RootStackParamList, "TelaCadCategoria">;
type CadastroFornecedorProps = NativeStackScreenProps<RootStackParamList, "TelaCadFornecedor">;
// Exportações
export default HomeNavigator;

export type {
  PrincipalProps,
  CadastroProdutoProps,
  ListaProdutosProps,
  DetalhesProdutoProps,
  CadastroCategoriaProps,
  CadastroFornecedorProps
};