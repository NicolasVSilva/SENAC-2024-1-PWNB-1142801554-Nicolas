// Obtém o modal
const modalEmpresa = document.getElementById("modalEmpresa");
const modalFuncionario = document.getElementById("modalFuncionario");
const modalEquipe = document.getElementById("modalEquipe");
const modalTarefa = document.getElementById("modalTarefa");

// Obtém o botão que abre o modal
const btnEmpresa = document.getElementById("btnCadEmpresa");
const btnEquipe = document.getElementById("btnCadEquipe");
const btnTarefa = document.getElementById("btnCadTarefa");
const btnFuncionario = document.getElementById("btnCadFuncionario");

// Obtém o elemento <span> que fecha o modal
const spanEmpresa = document.getElementById("closeEmpresa");
const spanFuncionario = document.getElementById("closeFuncionario");
const spanEquipe = document.getElementById("closeEquipe");
const spanTarefa = document.getElementById("closeTarefa");

//==================================================================================================================
//==================================================================================================================
// Quando o usuário clica no botão, abre o modal 
btnEmpresa.addEventListener('click', () => {
    modalEmpresa.style.display = "block"
})
btnEquipe.onclick = function () {
    modalEquipe.style.display = "block";

    const selecEmpresa = document.getElementById("modalCompanyEq");
    selecEmpresa.innerHTML = '<option>Selecione uma Empresa</option>';
    empresaArray.forEach(e => {
        let opt = document.createElement('option');
        opt.innerHTML = `${e.companyName}`;
        selecEmpresa.appendChild(opt);
    });

    const selecFunci = document.getElementById("modalEmployees");
    selecFunci.innerHTML = '<option>Selecione um Funcionario</option>';
    funcionarioArray.forEach(e => {
        let opt = document.createElement('option');
        opt.innerHTML = `${e.employeeName}`;
        selecFunci.appendChild(opt);
    });
}
btnFuncionario.onclick = function () {
    modalFuncionario.style.display = "block";

    const selecEmpresa = document.getElementById("modalCompany");
    selecEmpresa.innerHTML = '<option>Selecione uma Empresa</option>';
    empresaArray.forEach(e => {
        let opt = document.createElement('option');
        opt.innerHTML = `${e.companyName}`;
        selecEmpresa.appendChild(opt);
    });
}
btnTarefa.onclick = function () {
    modalTarefa.style.display = "block";

    const selecEmpresa = document.getElementById("company");
    selecEmpresa.innerHTML = '<option>Selecione uma Empresa</option>';
    empresaArray.forEach(e => {
        let opt = document.createElement('option');
        opt.innerHTML = `${e.companyName}`;
        selecEmpresa.appendChild(opt);
    });
    const selecEquipe = document.getElementById("team");
    selecEquipe.innerHTML = '<option>Selecione uma Equipe</option>';
    equipeArray.forEach(e => {
        let opt = document.createElement('option');
        opt.innerHTML = `${e.team}`;
        selecEquipe.appendChild(opt);
    });
}
//==================================================================================================================
//==================================================================================================================
// Quando o usuário clica no <span> (x), fecha o modal
spanEmpresa.onclick = function () {
    modalEmpresa.style.display = "none";
}
spanEquipe.onclick = function () {
    modalEquipe.style.display = "none";
}
spanFuncionario.onclick = function () {
    modalFuncionario.style.display = "none";
}
spanTarefa.onclick = function () {
    modalTarefa.style.display = "none";
}
//==================================================================================================================
//==================================================================================================================
// Quando o usuário clica fora do modal, fecha o modal
window.onclick = function (event) {
    if (event.target == modalEmpresa) {
        modalEmpresa.style.display = "none";
    }
    if (event.target == modalEquipe) {
        modalEquipe.style.display = "none";
    }
    if (event.target == modalFuncionario) {
        modalFuncionario.style.display = "none";
    }
    if (event.target == modalTarefa) {
        modalTarefa.style.display = "none";
    }
}
//==================================================================================================================
//==================================================================================================================
// Formata o campo CNPJ
document.getElementById('modalCnpj').addEventListener('input', function (e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + (x[3] ? '.' + x[3] : '') + (x[4] ? '/' + x[4] : '') + (x[5] ? '-' + x[5] : '');
});

// Formata o campo CPF
document.getElementById('modalCpf').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + (x[3] ? '.' + x[3] : '') + (x[4] ? '-' + x[4] : '');
});
//==================================================================================================================
//==================================================================================================================
// Função para adicionar item na Empresa
var empresaArray = localStorage.getItem('itemsEmpresa') ? JSON.parse(localStorage.getItem('itemsEmpresa')) : [];
const dataEmpresa = JSON.parse(localStorage.getItem('itemsEmpresa'));
const renderItemsEmpresa = () => {
    const addedItemsDivEM = document.getElementById('addEmpresa');
    addedItemsDivEM.innerHTML = '';
    empresaArray.forEach(item => {
        let divEm = document.createElement('div');
        divEm.innerHTML = `${item.companyName}, ${item.cnpj} <button class="delete">Excluir</button>`;
        addedItemsDivEM.appendChild(divEm);
    });
};
document.querySelector('#saveEmpresa').onclick = function () {
    let companyName = document.getElementById('modalCompanyName').value;
    let cnpj = document.getElementById('modalCnpj').value;

    if (companyName && cnpj) {
        let item = {
            companyName,
            cnpj
        };
        empresaArray.push(item);
        localStorage.setItem('itemsEmpresa', JSON.stringify(empresaArray));
        renderItemsEmpresa();

        // Limpa os campos do formulário
        document.getElementById('modalCompanyName').value = '';
        document.getElementById('modalCnpj').value = '';
    }
    renderSelectsEquipe();
};
document.querySelector('#cancelEmpresa').onclick = function () {
    document.getElementById('modalCompanyName').value = '';
    document.getElementById('modalCnpj').value = '';
};

// Função para excluir item
document.querySelector('#addEmpresa').onclick = function (event) {
    if (event.target.className == 'delete') {
        let index = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
        empresaArray.splice(index, 1);
        localStorage.setItem('itemsEmpresa', JSON.stringify(empresaArray));
        renderItemsEmpresa();
    }
};
//==================================================================================================================
//==================================================================================================================
// Função para adicionar item Funcionario
var funcionarioArray = localStorage.getItem('itemFuncionario') ? JSON.parse(localStorage.getItem('itemFuncionario')) : [];
const dataFuncionario = JSON.parse(localStorage.getItem('itemFuncionario'));

const renderItemsFuncionario = () => {
    const addedItemsDivFn = document.querySelector('#addFuncionario');
    addedItemsDivFn.innerHTML = '';
    funcionarioArray.forEach(item => {
        let divFn = document.createElement('div');
        divFn.innerHTML = `${item.employeeName}, ${item.cpf}, ${item.company} <button class="delete">Excluir</button>`;
        addedItemsDivFn.appendChild(divFn);
    });
};
document.querySelector('#saveFuncionario').onclick = function () {
    let employeeName = document.getElementById('modalEmployeeName').value;
    let cpf = document.getElementById('modalCpf').value;
    let company = document.getElementById('modalCompany').value;

    if (employeeName && cpf && company) {
        let item = {
            employeeName,
            cpf,
            company
        };
        funcionarioArray.push(item);
        localStorage.setItem('itemFuncionario', JSON.stringify(funcionarioArray));
        renderItemsFuncionario();

        // Limpa os campos do formulário
        document.getElementById('modalEmployeeName').value = '';
        document.getElementById('modalCpf').value = '';
        document.getElementById('modalCompany').value = 'Selecione uma Empresa';
    }
};
document.querySelector('#cancelFuncionario').onclick = function () {
    document.getElementById('modalEmployeeName').value = '';
    document.getElementById('modalCpf').value = '';
    document.getElementById('modalCompany').value = 'Selecione uma Empresa';
};
// Função para excluir item
document.querySelector('#addFuncionario').onclick = function (event) {
    if (event.target.className == 'delete') {
        var index = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
        funcionarioArray.splice(index, 1);
        localStorage.setItem('itemFuncionario', JSON.stringify(funcionarioArray));
        renderItemsFuncionario();
    }
};
//==================================================================================================================
//==================================================================================================================
//Função para adicionar funcionario na Equipe
var btnAddFunEq = document.getElementById('addFunquipe');
btnAddFunEq.onclick = function () {
    const addedItemsDivEqFn = document.querySelector('#addEqFunc');
    addedItemsDivEqFn.innerHTML += document.getElementById('modalEmployees').value + "<br>";

    const selecFunci = document.getElementById("modalEmployees");
    selecFunci.innerHTML = '<option>Selecione um Funcionario</option>';
    funcionarioArray.forEach(e => {
        let opt = document.createElement('option');
        opt.innerHTML = `${e.employeeName}`;
        selecFunci.appendChild(opt);
    });
}
// Função para adicionar item Equipe
var equipeArray = localStorage.getItem('itemEquipe') ? JSON.parse(localStorage.getItem('itemEquipe')) : [];
const dataEquipe = JSON.parse(localStorage.getItem('itemEquipe'));

const renderItensEquipe = () => {
    const addedItemsDivEq = document.querySelector('#addEquipe');
    addedItemsDivEq.innerHTML = '';
    equipeArray.forEach(item => {
        let divEq = document.createElement('div');
        divEq.innerHTML = `${item.team}, ${item.company} <button class="delete">Excluir</button>`;
        addedItemsDivEq.appendChild(divEq);
    })
}
document.querySelector('#saveEquipe').onclick = function () {
    let team = document.getElementById('modalTeam').value;
    let company = document.getElementById('modalCompanyEq').value;
    let employees = document.getElementById('addEqFunc').innerText;

    console.log(employees);
    if (team && company && employees) {
        let item = {
            team,
            company,
            employees
        };
        console.log("oi");
        equipeArray.push(item);
        localStorage.setItem('itemEquipe', JSON.stringify(equipeArray));
        renderItensEquipe();

        // Limpa os campos do formulário
        document.getElementById('modalTeam').value = '';
        const selecEmpresa = document.getElementById("modalCompanyEq");
        selecEmpresa.innerHTML = '<option>Selecione uma Empresa</option>';
        empresaArray.forEach(e => {
            let opt = document.createElement('option');
            opt.innerHTML = `${e.companyName}`;
            selecEmpresa.appendChild(opt);
        });
        const selecFunci = document.getElementById("modalEmployees");
        selecFunci.innerHTML = '<option>Selecione um Funcionario</option>';
        funcionarioArray.forEach(e => {
            let opt = document.createElement('option');
            opt.innerHTML = `${e.employeeName}`;
            selecFunci.appendChild(opt);
        });
        document.getElementById('addEqFunc').innerText = '';
    }
    renderSelectsAtividade();
    // renderSelectsAnotacao();
    renderSelectsRelatorio();
};
document.querySelector('#cancelEquipe').onclick = function () {
    document.getElementById('modalTeam').value = '';
    const selecEmpresa = document.getElementById("modalCompanyEq");
    selecEmpresa.innerHTML = '<option>Selecione uma Empresa</option>';
    empresaArray.forEach(e => {
        let opt = document.createElement('option');
        opt.innerHTML = `${e.companyName}`;
        selecEmpresa.appendChild(opt);
    });
    const selecFunci = document.getElementById("modalEmployees");
    selecFunci.innerHTML = '<option>Selecione um Funcionario</option>';
    funcionarioArray.forEach(e => {
        let opt = document.createElement('option');
        opt.innerHTML = `${e.employeeName}`;
        selecFunci.appendChild(opt);
    });
    document.getElementById('addEqFunc').innerText = '';
};
// Função para excluir item
document.querySelector('#addEquipe').onclick = function (event) {
    if (event.target.className == 'delete') {
        var index = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
        equipeArray.splice(index, 1);
        localStorage.setItem('itemEquipe', JSON.stringify(equipeArray));
        renderItensEquipe();
    }
};
//==================================================================================================================
//==================================================================================================================

// Função para adicionar item na Empresa
var tarefaArray = localStorage.getItem('itemsTarefa') ? JSON.parse(localStorage.getItem('itemsTarefa')) : [];
const dataTarefa = JSON.parse(localStorage.getItem('itemsTarefa'));

const renderItemsTarefa = () => {
    const addedItemsDivTa = document.getElementById('addTarefa');
    addedItemsDivTa.innerHTML = '';
    tarefaArray.forEach(item => {
        let divTa = document.createElement('div');
        divTa.innerHTML = `${item.taskName}, ${item.companyName},${item.teamName} <button class="delete">Excluir</button>`;
        addedItemsDivTa.appendChild(divTa);
    });
};

document.querySelector('#saveTarefa').onclick = function () {
    let taskName = document.getElementById('taskName').value;
    let companyName = document.getElementById('company').value;
    let teamName = document.getElementById('team').value;
    let desc = document.getElementById('description').value;
    let status = 'Pendente';
    let data = new Date();

    console.log(taskName + companyName + teamName + desc);
    if (taskName && companyName && teamName && desc) {
        let item = {
            taskName,
            companyName,
            teamName,
            desc,
            status,
            data
        };
        tarefaArray.push(item);
        localStorage.setItem('itemsTarefa', JSON.stringify(tarefaArray));
        renderItemsTarefa();

        // Limpa os campos do formulário
        document.getElementById('taskName').value = '';
        document.getElementById('company').value = '';
        document.getElementById('team').value = '';
        document.getElementById('description').value = '';
    }
    // renderSelectsAnotacao();
    renderSelectsRelatorio();
};
document.querySelector('#cancelTarefa').onclick = function () {
    document.getElementById('taskName').value = '';
    document.getElementById('company').value = '';
    document.getElementById('team').value = '';
    document.getElementById('description').value = '';
};

// Função para excluir item
document.querySelector('#addTarefa').onclick = function (event) {
    if (event.target.className == 'delete') {
        let index = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
        tarefaArray.splice(index, 1);
        localStorage.setItem('itemsTarefa', JSON.stringify(tarefaArray));
        renderItemsTarefa();
    }
};

//==================================================================================================================
//==================================================================================================================

document.addEventListener('DOMContentLoaded', renderItemsFuncionario);
document.addEventListener('DOMContentLoaded', renderItemsEmpresa);
document.addEventListener('DOMContentLoaded', renderItensEquipe);
document.addEventListener('DOMContentLoaded', renderItemsTarefa);
//==================================================================================================================
//==================================================================================================================
window.addEventListener('load', function () {
    renderSelectsEquipe();
    renderSelectsAtividade();
    // renderSelectsAnotacao();
    renderSelectsRelatorio();
});

function renderSelectsEquipe() {
    const selecEmpresa = document.getElementById("bscEmpresa");
    selecEmpresa.innerHTML = '<option value="0">Selecione uma Empresa</option>';
    empresaArray.forEach(e => {
        let opt = document.createElement('option');
        opt.innerHTML = `${e.companyName}`;
        selecEmpresa.appendChild(opt);
    });
}
function renderSelectsAtividade() {
    const selecEquipe = document.getElementById("bscEquipesAt");
    selecEquipe.innerHTML = '<option value="0">Selecione uma Equipe</option>';
    equipeArray.forEach(e => {
        let opt = document.createElement('option');
        opt.innerHTML = `${e.team}`;
        selecEquipe.appendChild(opt);
    });
}
// function renderSelectsAnotacao() {
//     const selecEquipe = document.getElementById("bscEquipesAn");
//     selecEquipe.innerHTML = '<option value="0">Selecione uma Equipe</option>';
//     equipeArray.forEach(e => {
//         let opt = document.createElement('option');
//         opt.innerHTML = `${e.team}`;
//         selecEquipe.appendChild(opt);
//     });

//     const selecTarefa = document.getElementById("bscTarefasAn");
//     selecTarefa.innerHTML = '<option value="0">Selecione uma Tarefa</option>';
//     tarefaArray.forEach(e => {
//         let opt = document.createElement('option');
//         opt.innerHTML = `${e.taskName}`;
//         selecTarefa.appendChild(opt);
//     });
// }
function renderSelectsRelatorio() {
    const selecEquipe = document.getElementById("bscEquipesRe");
    selecEquipe.innerHTML = '<option value="0">Selecione uma Equipe</option>';
    equipeArray.forEach(e => {
        let opt = document.createElement('option');
        opt.innerHTML = `${e.team}`;
        selecEquipe.appendChild(opt);
    });

    const selecTarefa = document.getElementById("bscTarefasRe");
    selecTarefa.innerHTML = '<option value="0">Selecione uma Tarefa</option>';
    tarefaArray.forEach(e => {
        let opt = document.createElement('option');
        opt.innerHTML = `${e.taskName}`;
        selecTarefa.appendChild(opt);
    });
}

//==================================================================================================================
//==================================================================================================================

var BuscaEquipe = document.getElementById('BuscaEquipe');
var BuscaAtividade = document.getElementById('BuscaAtividade');
var BuscaAnotacao = document.getElementById('BuscaAnotacao');
var BuscaRelatorio = document.getElementById('BuscaRelatorio');

BuscaEquipe.addEventListener('click', () => {
    const lista = document.getElementById('listaEquipes');
    lista.innerHTML = '';
    if (document.getElementById('bscEmpresa').value == 0) {
        equipeArray.forEach(e => {
            let li = document.createElement('div');
            li.className = ('lstElementos')
            li.innerHTML = `${e.team}<br><br>${e.company}<br><br>${e.employees.replace(/ /g, '<br>')}`
            lista.appendChild(li);
        })
    } else {
        equipeArray.forEach(e => {
            if (e.company == document.getElementById('bscEmpresa').value) {
                let li = document.createElement('div');
                li.className = ('lstElementos')
                li.innerHTML = `${e.team}</br></br>${e.company}</br></br>${e.employees}`
                lista.appendChild(li);
            }
        })
    }
});

BuscaAtividade.addEventListener('click', () => {
    const lista = document.getElementById('listaAtividades');
    lista.innerHTML = '';
    if (document.getElementById('bscEquipesAt').value == 0) {
        console.log('oi')
        tarefaArray.forEach(e => {
            console.log('oiiiiiiii')
            let li = document.createElement('div');
            li.className = ('lstElementos');
            li.innerHTML = `${e.taskName}</br></br>${e.companyName}</br></br>${e.teamName}</br></br>${e.desc}`
            lista.appendChild(li);
        });
    } else {
        console.log('oiiiiiiiieeeeeeeeeee')
        tarefaArray.forEach(e => {
            if (document.getElementById('bscEquipesAt').value == e.teamName) {
                let li = document.createElement('div');
                li.className = ('lstElementos');
                li.innerHTML = `${e.taskName}</br></br>${e.companyName}</br></br>${e.teamName}</br></br>${e.desc}`;
                lista.appendChild(li);
            }
        });
    }
});

// BuscaAnotacao.addEventListener('click', () => {
//     const lista = document.getElementById('listaAnotações');
//     lista.innerHTML = '';
//     if (document.getElementById('bscEquipesAn').value == 0 && document.getElementById('bscTarefasAn').value == 0 ) {

//     }else if(document.getElementById('bscEquipesAn').value != 0 && document.getElementById('bscTarefasAn').value == 0){

//     }else if(document.getElementById('bscEquipesAn').value == 0 && document.getElementById('bscTarefasAn').value != 0){

//     }else{

//     }
// });
BuscaRelatorio.addEventListener('click', () => {
    const lista = document.getElementById('listaRelatorio');
    lista.innerHTML = '';
    if (document.getElementById('bscEquipesRe').value == 0 || document.getElementById('bscTarefasRe').value == 0) {
        window.alert("Seleção obrigatória");
    } else {
        tarefaArray.forEach(e => {
            if (document.getElementById('bscEquipesRe').value == e.teamName && document.getElementById('bscTarefasRe').value == e.taskName) {
                let li = document.createElement('div');
                li.className = 'lstElementosRelatorio';

                // Adiciona o conteúdo da tarefa
                li.innerHTML = `
                    ${e.taskName}</br></br>
                    ${e.companyName}</br></br>
                    ${e.teamName}</br></br>
                    ${e.data}</br></br>
                    ${e.desc}
                `;
                lista.appendChild(li);
            }
        });
    }
});

