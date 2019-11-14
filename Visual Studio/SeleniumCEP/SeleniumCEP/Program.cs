using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Text;

namespace SeleniumCEP
{
    class Program
    {
        static void Main(string[] args)
        {

            Console.OutputEncoding = Encoding.Unicode;
            Console.InputEncoding = Encoding.Unicode;

            var driver = new ChromeDriver();

            driver.Url = @"C:\Projects\buscaCEP\index.html";
            driver.Navigate();

            //"14080-200"
            string cep;

            Console.WriteLine("-----------------------------------");
            Console.WriteLine("Digite o CEP: ");
            cep = Console.ReadLine();

            // XPath reconhece o campo 
            driver.FindElementByXPath("//*[@id='consulta']/div/div/input").SendKeys(cep);

            driver.FindElementByXPath("//*[@id='consulta']/div/div/input").SendKeys(Keys.Enter);

            var tagRua = "/html/body/div/section[2]/div[2]/article/div[2]/ul/li[1]/span";
            var tagBairro = "/html/body/div/section[2]/div[2]/article/div[2]/ul/li[3]/span";
            var tagCidade = "/html/body/div/section[2]/div[2]/article/div[2]/ul/li[4]/span";
            var tagUf = "/html/body/div/section[2]/div[2]/article/div[2]/ul/li[5]/span";

            string rua, bairro, cidade, uf;     //"Rua Padre Euclides";
                                                //"Campos Elíseos";
                                                //"Ribeirão Preto";
                                                //"SP";

            Console.WriteLine("");
            Console.WriteLine("Endereço: ");
            rua = Console.ReadLine();

            Console.WriteLine("");
            Console.WriteLine("Bairro: ");
            bairro = Console.ReadLine();

            Console.WriteLine("");
            Console.WriteLine("Cidade: ");
            cidade = Console.ReadLine();

            Console.WriteLine("");
            Console.WriteLine("UF: ");
            uf = Console.ReadLine();

            Console.WriteLine("-----------------------------------");

            if (driver.FindElementByXPath(tagRua).Text
                .Equals(rua, StringComparison.InvariantCultureIgnoreCase) &&

                driver.FindElementByXPath(tagBairro).Text
                .Equals(bairro, StringComparison.InvariantCultureIgnoreCase) &&

                driver.FindElementByXPath(tagCidade).Text
                .Equals(cidade, StringComparison.InvariantCultureIgnoreCase) &&

                driver.FindElementByXPath(tagUf).Text
                .Equals(uf, StringComparison.InvariantCultureIgnoreCase)
               )
            {
                Console.WriteLine("O resultado comparado está correto");
            }
            else
            {
                Console.WriteLine("Ocorreu um erro, pois o valor comparado está incorreto.");
            }

            Console.ReadKey();
            driver.Quit();
        }
    }
}