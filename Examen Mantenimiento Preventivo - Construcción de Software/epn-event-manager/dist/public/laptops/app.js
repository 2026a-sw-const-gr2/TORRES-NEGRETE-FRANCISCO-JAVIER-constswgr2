const form = document.getElementById('laptop-form');
const list = document.getElementById('laptops-list');
const message = document.getElementById('message');
const refreshBtn = document.getElementById('refresh-btn');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
let laptopsCache = [];
let searchTerm = '';

function setMessage(text, type = 'ok') {
  message.textContent = text;
  message.className = `message ${type}`;
}

function parseOptionalNumber(value) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function getErrorMessage(error) {
  return error instanceof Error ? error.message : 'Ocurrio un error inesperado';
}

function parseEditableNumber(value, label) {
  if (value === '') return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    throw new Error(`${label} debe ser un numero mayor a 0`);
  }
  return parsed;
}

function matchesSearch(item, term) {
  if (!term) return true;

  const name = String(item.name ?? '').toLowerCase();
  const brand = String(item.brand ?? '').toLowerCase();
  return name.includes(term) || brand.includes(term);
}

function getFilteredLaptops() {
  const normalizedTerm = searchTerm.trim().toLowerCase();
  return laptopsCache.filter((item) => matchesSearch(item, normalizedTerm));
}

function refreshRenderedList() {
  renderLaptops(getFilteredLaptops());
}

function renderLaptops(items) {
  laptopsCache = Array.isArray(items) ? items : [];
  list.innerHTML = '';

  if (!Array.isArray(items) || items.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = searchTerm.trim()
      ? 'No se encontraron laptops con ese criterio.'
      : 'No hay laptops registradas aun.';
    list.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const li = document.createElement('li');
    const title = document.createElement('strong');
    title.textContent = `${item.name} ${item.brand ? `(${item.brand})` : ''}`;

    const details = document.createElement('small');
    details.textContent = `RAM: ${item.ram ?? '-'} GB | Storage: ${item.storage ?? '-'} GB | ID: ${item.id}`;

    const actions = document.createElement('div');
    actions.className = 'item-actions';

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'action-btn edit-btn';
    editButton.dataset.id = String(item.id);
    editButton.textContent = 'Editar';

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'action-btn delete-btn';
    deleteButton.dataset.id = String(item.id);
    deleteButton.textContent = 'Eliminar';

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    li.appendChild(title);
    li.appendChild(details);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

async function removeLaptopById(id) {
  const res = await fetch(`/laptops/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'No se pudo eliminar la laptop');
  }
}

async function updateLaptopById(id, payload) {
  const res = await fetch(`/laptops/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'No se pudo actualizar la laptop');
  }
}

async function loadLaptops() {
  try {
    const res = await fetch('/laptops');
    if (!res.ok) throw new Error('No se pudo consultar el listado');
    const data = await res.json();
    laptopsCache = Array.isArray(data) ? data : [];
    refreshRenderedList();
  } catch (error) {
    setMessage(getErrorMessage(error), 'error');
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = {
    name: String(formData.get('name') || '').trim(),
    brand: String(formData.get('brand') || '').trim() || undefined,
    ram: parseOptionalNumber(String(formData.get('ram') || '')),
    storage: parseOptionalNumber(String(formData.get('storage') || '')),
  };

  if (!payload.name) {
    setMessage('El nombre es obligatorio.', 'error');
    return;
  }

  try {
    const res = await fetch('/laptops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'No se pudo guardar la laptop');
    }

    form.reset();
    setMessage('Laptop guardada correctamente.', 'ok');
    await loadLaptops();
  } catch (error) {
    setMessage(getErrorMessage(error), 'error');
  }
});

list.addEventListener('click', async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;

  const id = Number(target.dataset.id || '');
  if (!Number.isFinite(id)) return;

  if (target.classList.contains('delete-btn')) {
    const confirmed = window.confirm('Esta seguro de eliminar esta laptop?');
    if (!confirmed) return;

    try {
      await removeLaptopById(id);
      setMessage('Laptop eliminada correctamente.', 'ok');
      await loadLaptops();
    } catch (error) {
      setMessage(getErrorMessage(error), 'error');
    }
    return;
  }

  if (target.classList.contains('edit-btn')) {
    const selected = laptopsCache.find((item) => item.id === id);
    if (!selected) {
      setMessage('No se encontro la laptop seleccionada.', 'error');
      return;
    }

    const newName = window.prompt('Nuevo nombre:', selected.name ?? '');
    if (newName === null) return;
    const trimmedName = newName.trim();
    if (!trimmedName) {
      setMessage('El nombre no puede estar vacio.', 'error');
      return;
    }

    const newBrand = window.prompt('Nueva marca (deja vacio para quitar):', selected.brand ?? '');
    if (newBrand === null) return;

    const newRam = window.prompt('Nueva RAM en GB (deja vacio para quitar):', selected.ram != null ? String(selected.ram) : '');
    if (newRam === null) return;

    const newStorage = window.prompt(
      'Nuevo almacenamiento en GB (deja vacio para quitar):',
      selected.storage != null ? String(selected.storage) : '',
    );
    if (newStorage === null) return;

    try {
      const payload = {
        name: trimmedName,
        brand: newBrand.trim() || undefined,
        ram: parseEditableNumber(newRam.trim(), 'RAM'),
        storage: parseEditableNumber(newStorage.trim(), 'Storage'),
      };

      await updateLaptopById(id, payload);
      setMessage('Laptop actualizada correctamente.', 'ok');
      await loadLaptops();
    } catch (error) {
      setMessage(getErrorMessage(error), 'error');
    }
  }
});

refreshBtn.addEventListener('click', () => {
  void loadLaptops();
});

searchInput.addEventListener('input', () => {
  searchTerm = searchInput.value;
  refreshRenderedList();
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchTerm = '';
  refreshRenderedList();
});

void loadLaptops();
